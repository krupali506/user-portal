import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/components/login/login.component';
import { RegistrationComponent } from './components/authentication/components/registration/registration.component';
import { UserListComponent } from './components/user/components/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'userDetails', component: UserListComponent },
  { path: 'updateUserDetails', component: RegistrationComponent },
  { path: 'userProfile', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
