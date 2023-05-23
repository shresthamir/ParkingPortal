import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { SnackBarService } from 'src/app/_helperService/snack-bar.service';
import { ValidationService } from 'src/app/_helperService/validate.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  username = "";
  password = "";
  submitted = false;
  error = '';



  constructor(private route: ActivatedRoute, public router: Router, public authService: AuthServiceService
    , private v: ValidationService,
    private snackBarService :SnackBarService
  ) {

  }
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl(''),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          // this.v.passwordMinLowerCaseLettersValidator(),
        ]),
        newPasswordConfirm: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      },
      this.v.passwordMatch('newPassword', 'newPasswordConfirm')
    );
  }
  get f() { return this.changePasswordForm.controls; }

  // onSubmit(event: any) {

  //   this.router.navigate(["/changePassword"]);

  // }
  cancel() {
    console.log();
    this.router.navigate([this.route.snapshot.queryParams["returnUrl"] || "/login"]);
  }
  onSubmit(event: any) {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.authService.changePassowrd(this.f.oldPassword.value, this.f.newPassword.value)
      .subscribe({
        next: (data) => {
          if (data.status == "ok") {
            this.authService.login(sessionStorage.getItem("UserName") || '', this.f.newPassword.value)
              .subscribe((data) => {
                if (data.status == "ok") {
                  // sessionStorage.setItem('UserName', data.usersInfo.userId)
                  sessionStorage.setItem('USER_PROFILE', JSON.stringify(data.result));
                  localStorage.setItem('ImsParkingToken', data.result.token);
                  this.router.navigate(["/dashbaordComponent"]);
                }
              })
          }
        },
        error: (e: HttpErrorResponse) => this.snackBarService.openSnackBar(e.error.message)
      })
  }

  get passwordControl(): AbstractControl {
    return this.f.newPassword;
  }

  get confirmPasswordControl() {
    return this.f.newPasswordConfirm;
  }

  public getPasswordError() {
    const control: AbstractControl = this.passwordControl;
    console.log(this.passwordControl?.errors);
    return this.passwordControl?.hasError('required')
      ? 'Please enter a valid password'
      : control.hasError('minlength')
        ? 'The minimum password length is 8 characters'
        : control.hasError('maxlength')
          ? 'The maximum password length is 32 characters'
          : control.hasError('invalidPasswordMinLowerCaseLetters')
            ? 'The password must consists of lower/upper case & numeric characters.'
            : '';
  }

  public getConfirmPasswordError() {
    const control: AbstractControl = this.confirmPasswordControl;
    return control.hasError('required')
      ? 'Please confirm the  password'
      : control.hasError('passwordMismatch')
        ? 'The passwords do not match'
        : '';
  }

}
