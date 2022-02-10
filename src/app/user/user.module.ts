import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AtLeastOneAccessUserComponent } from './at-least-one-access-user/at-least-one-access-user.component';
import { NoCommunityAccessUserComponent } from './no-community-access-user/no-community-access-user.component';


@NgModule({
  declarations: [
    AtLeastOneAccessUserComponent,
    NoCommunityAccessUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
