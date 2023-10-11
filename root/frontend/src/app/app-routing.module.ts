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
  {
    path: 'donor',
    children: [
      { path: 'register', component: RegisterDonorComponent },
      { path: 'profile', component: ProfileDonorComponent },
    ],
  },
  {
    path: 'adopter',
    children: [
      { path: 'register', component: RegisterAdopterComponent },
      { path: 'profile', component: ProfileAdopterComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
