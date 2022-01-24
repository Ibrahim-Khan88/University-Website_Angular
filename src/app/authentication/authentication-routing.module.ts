import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: "auth", children: [
      { path: "login", component: LoginComponent },
      { path: "registration", component: RegistrationComponent },
      { path: "user", component: UserPageComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
