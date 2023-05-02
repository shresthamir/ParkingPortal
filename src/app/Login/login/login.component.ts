import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup ;
  username = "";
  password = "";
  // errorMsg = "";
  submitted = false;
  error = '';

  constructor(public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthServiceService,){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['']
    });
  }
  get f() { return this.loginForm.controls; }



  onSubmit(event: any) {
    // this.router.navigate(["/dashbaordComponent"]);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe((data:any) => {
        if (data.status == "ok") {
       
          sessionStorage.setItem('PakingUserName', data.result.userName);
          sessionStorage.setItem('USER_PROFILE', JSON.stringify(data.result));
          localStorage.setItem('ImsParkingToken', data.result.token);
          if (data.message == "Password Expired")
            this.router.navigate(["/changePassword"]);
          else {
         
            this.router.navigate(["/dashbaordComponent"]);
          }
        }
      })
  }
}
