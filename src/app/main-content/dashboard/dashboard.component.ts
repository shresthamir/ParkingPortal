import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MasterRepoService } from 'src/app/services/master-repo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  VechileList:any[]=[];
  imageSource:any[]=[];
   btnlink:any[]=[];
   vechileListvalue:any[]=[];
   VoucherTypeList:any[]=[];
  constructor(public auth: AuthServiceService, private router: Router, public masterService: MasterRepoService,private _sanitizer: DomSanitizer){
    this.getVechileType();

  }

 
  getVechileType(){
    this.masterService.getVechileType().subscribe((Data: any) => {
      console.log('vechileType',Data, Data.result)
     
      Data.result.forEach((image:any) => {
        image.buttonImage = `data:image/png;base64,${image.buttonImage}`;

      });

      this.VechileList = Data.result;
    
    ;
    })
  }


  getVoucherType(value:any)  {
    console.log('vouchertype',value.vTypeID)
    this.masterService.getVoucherType(value.vTypeID).subscribe((Data: any) => {
      console.log('data', Data.result);
      this.VoucherTypeList=Data.result;
    
    })

  }

}
