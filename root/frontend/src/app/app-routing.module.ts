import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-adopter', component: RegisterAdopterComponent },
  { path: 'register-donor', component: RegisterDonorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile-adopter', component: ProfileAdopterComponent },
  { path: 'profile-donor', component: ProfileDonorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
