import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentAdminRoutingModule } from './department-admin-routing.module';
import { DepartmentAdminComponent } from './department-admin/department-admin.component';


@NgModule({
  declarations: [
    DepartmentAdminComponent
  ],
  imports: [
    CommonModule,
    DepartmentAdminRoutingModule
  ]
})
export class DepartmentAdminModule { }
