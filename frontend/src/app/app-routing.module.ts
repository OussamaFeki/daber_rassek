import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreatecardasclientComponent } from './client-freelancer/createcardasclient/createcardasclient.component';
import { CreatecardasFreelancerComponent } from './client-freelancer/createcardas-freelancer/createcardas-freelancer.component';
import { CardClientsComponent } from './client-freelancer/card-clients/card-clients.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'addclientcard',component:CreatecardasclientComponent},
  {path:'addfreelancercard',component:CreatecardasFreelancerComponent},
  {path:'card-client',component:CardClientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
