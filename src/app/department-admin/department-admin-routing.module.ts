import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentAdminComponent } from './department-admin/department-admin.component';

const routes: Routes = [
  {path: "department-admin", children: [
    { path: "page", component: DepartmentAdminComponent }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentAdminRoutingModule { }
