import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterRepoService {
  apiUrl: string;


  constructor(private router: Router, public http: HttpClient, public authService: AuthServiceService,) { 
    this.apiUrl = localStorage.getItem("parkingapiUrl") ?? environment.baseUrl
  }

  getVechileType( ) {
    return this.http.get(`${this.apiUrl}/api/GetAllVehicleType`);
    
  }

  getVoucherType(voucherId:string ) {
    return this.http.get(`${this.apiUrl}/api/GetVoucherTypesForPortal?vtypeId=${voucherId}`);
    
  }

  generateParkingVoucher(VoucherId:number ){
    let data = {voucherId : VoucherId}
    return this.http.post(this.apiUrl + `/api/GenerateParkingVoucher`, data, this.getRequestOptionForPdfFile());


  }

  getRequestOptionForPdfFile() {
    const httpOptions = {
      responseType: 'blob' as 'json',
  
    };
    return httpOptions;
    }
  

}
