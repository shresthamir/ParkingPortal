import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/_helperService/snack-bar.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  username = "";
  password = "";
  // errorMsg = "";
  submitted = false;
  error = '';

  constructor(public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public snackBarService: SnackBarService,
    public authService: AuthServiceService,) {

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
      .subscribe({
        next: (data: any) => {
          if (data.status == "ok") {
            console.log('datta', data);
            sessionStorage.setItem('UserName', data.result.user.userName);
            sessionStorage.setItem('USER_PROFILE', JSON.stringify(data.result));
            localStorage.setItem('ImsParkingToken', data.result.token);
            if (data.message == "Password Expired") {
              let snackBarRef =  this.snackBarService.openSnackBar("You need to change password to continue.");
              snackBarRef.afterDismissed().subscribe(() => {
                this.router.navigate(["/changePassword"]);
              });
            }
            else {
                this.router.navigate(["/dashbaordComponent"]);
            }
          }
        },
        error: (e: HttpErrorResponse) => {
          this.snackBarService.openSnackBar( e.error.message);
        }
      })
  }
}
