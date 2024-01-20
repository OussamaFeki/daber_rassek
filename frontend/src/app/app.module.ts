import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatecardasclientComponent } from './client-freelancer/createcardasclient/createcardasclient.component';
import { CreatecardasFreelancerComponent } from './client-freelancer/createcardas-freelancer/createcardas-freelancer.component';
import { CardFreelanceComponent } from './client-freelancer/card-freelance/card-freelance.component';
import { CardClientsComponent } from './client-freelancer/card-clients/card-clients.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './userinterface/profile/profile.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreatecardasclientComponent,
    CreatecardasFreelancerComponent,
    CardFreelanceComponent,
    CardClientsComponent,
    HomepageComponent,
    UserinterfaceComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
