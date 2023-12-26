import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatecardasclientComponent } from './client-freelancer/createcardasclient/createcardasclient.component';
import { CreatecardasFreelancerComponent } from './client-freelancer/createcardas-freelancer/createcardas-freelancer.component';
import { CardFreelanceComponent } from './client-freelancer/card-freelance/card-freelance.component';
import { CardClientsComponent } from './client-freelancer/card-clients/card-clients.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreatecardasclientComponent,
    CreatecardasFreelancerComponent,
    CardFreelanceComponent,
    CardClientsComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
