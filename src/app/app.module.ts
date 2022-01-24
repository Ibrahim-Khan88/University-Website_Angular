import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SuperAdminModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
