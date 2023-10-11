import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RegisterAdopterComponent } from './adopter/pages/register-adopter/register-adopter.component';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './adopter/pages/home/home.component';
import { ProfileAdopterComponent } from './adopter/pages/profile-adopter/profile-adopter.component';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';
import { PetsDonorComponent } from './pages/pets-donor/pets-donor.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'donor',
    children: [
      { path: 'register', component: RegisterDonorComponent },
      { path: 'profile', component: ProfileDonorComponent },
      { path: 'pets', component: PetsDonorComponent },
    ],
  },
/*   {
    path: 'adopter',
    children: [
      { path: 'register', component: RegisterAdopterComponent },
      { path: 'profile', component: ProfileAdopterComponent },
      { path: 'home', component: HomeComponent },
    ],
  }, */
  {
    path: 'adopter',
    loadChildren: () => import('./adopter/adopter.module').then((m) => m.AdopterModule),
  },
  { path: 'donor', loadChildren: () => import('./donor/donor.module').then((m) => m.DonorModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
