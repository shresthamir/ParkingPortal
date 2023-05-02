import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  UserProfile: any;

  constructor(private router: Router){

    let UserProfileValue: any = (sessionStorage.getItem('USER_PROFILE'));
    console.log('UserProfileValue',UserProfileValue,)
    // console.log('this.UserProfile', UserProfileValue);
    // console.log('this.UserProfile', JSON.parse(UserProfileValue));
    this.UserProfile = JSON.parse(UserProfileValue);
    console.log('UserProfileValue',this.UserProfile,)

  }

  signout() {
    localStorage.removeItem('ImsParkingToken');
    this.router.navigate(['/login']);
    return true;
  }

}
