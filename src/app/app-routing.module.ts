import { NgModule } from '@angular/core';
import { LoginComponent } from './Login/login/login.component';
import { ChangePasswordComponent } from './Login/change-password/change-password.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path: 'changePassword', component:ChangePasswordComponent},
  { path: 'dashbaordComponent', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
