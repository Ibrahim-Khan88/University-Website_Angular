import { Component, NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { CommunityComponent } from './community/community.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';

const routes: Routes = [
  {path: "admin", children: [
    { path: "page", component: PageComponent },
    { path: "community", component: CommunityComponent },
    { path: "userdetail", component: UserDetailPageComponent }

  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
