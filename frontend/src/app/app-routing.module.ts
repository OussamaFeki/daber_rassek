import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreatecardasclientComponent } from './client-freelancer/createcardasclient/createcardasclient.component';
import { CreatecardasFreelancerComponent } from './client-freelancer/createcardas-freelancer/createcardas-freelancer.component';
import { CardClientsComponent } from './client-freelancer/card-clients/card-clients.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [

  {path:'addclientcard',component:CreatecardasclientComponent},
  {path:'addfreelancercard',component:CreatecardasFreelancerComponent},
  {path:'card-client',component:CardClientsComponent},
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'user',component:UserinterfaceComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
