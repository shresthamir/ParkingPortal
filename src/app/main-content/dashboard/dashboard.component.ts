import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/_helperService/snack-bar.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MasterRepoService } from 'src/app/services/master-repo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  VechileList: any[] = [];
  imageSource: any[] = [];
  vechileListvalue: any[] = [];
  VoucherTypeList: any[] = [];
  constructor(public auth: AuthServiceService,
    private router: Router,
    public masterService: MasterRepoService,
    private _sanitizer: DomSanitizer,
    private snackBarService: SnackBarService) {
    this.getVechileType();

  }


  getVechileType() {
    this.masterService.getVechileType().subscribe({
      next: (Data: any) => {
        Data.result.forEach((image: any) => {
          image.buttonImage = `data:image/png;base64,${image.buttonImage}`;

        });

        this.VechileList = Data.result;
      },
      error: (e: HttpErrorResponse) => this.snackBarService.openSnackBar(e.error.message)
    })
  }


  getVoucherType(value: any) {
    this.masterService.getVoucherType(value.vTypeID).subscribe({
      next: (Data: any) => {
        this.VoucherTypeList = Data.result;
      },
      error: (e: HttpErrorResponse) => this.snackBarService.openSnackBar(e.error.message)
    })

  }



  SendVoucherID(value: any) {
    let blob: any;
    this.masterService.generateParkingVoucher(value.voucherId).subscribe({
      next: (Data: any) => {
        const blob = new Blob([Data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow?.print();
      },
      error: (e: HttpErrorResponse) => this.snackBarService.openSnackBar(e.error.message)
    })

  }

}
