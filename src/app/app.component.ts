import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imsParking';


  constructor( public http: HttpClient){
    this.http.get("/assets/appConfig.json")
    .subscribe((data:any)=>{
      localStorage.setItem("parkingapiUrl", data.apiUrl)        
    });
  }
}
