import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { PageComponent } from './page/page.component';
import { CommunityComponent } from './community/community.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageComponent,
    CommunityComponent,
    UserDetailPageComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SuperAdminModule { }
