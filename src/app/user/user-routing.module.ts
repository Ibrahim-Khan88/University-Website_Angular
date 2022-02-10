import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtLeastOneAccessUserComponent } from './at-least-one-access-user/at-least-one-access-user.component';
import { NoCommunityAccessUserComponent } from './no-community-access-user/no-community-access-user.component';
import { OtherUserComponent } from './other-user/other-user.component';

const routes: Routes = [
  {path: "user", children: [
    { path: "user", component: OtherUserComponent }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
