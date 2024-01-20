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
import { isloggedGuard } from './guards/islogged.guard';
import { ProfileComponent } from './userinterface/profile/profile.component';
import { AllusersComponent } from './userinterface/allusers/allusers.component';
const routes: Routes = [

  {path:'addclientcard',component:CreatecardasclientComponent,canActivate:[AuthGuard]},
  {path:'addfreelancercard',component:CreatecardasFreelancerComponent,canActivate:[AuthGuard]},
  {path:'card-client',component:CardClientsComponent},
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent,canActivate:[isloggedGuard]},
  {path:'signup',component:SignupComponent,canActivate:[isloggedGuard]},
  {path:'user',component:UserinterfaceComponent,canActivate:[AuthGuard],children:[
    {path:'',component:AllusersComponent},
    {path:'profile',component:ProfileComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
