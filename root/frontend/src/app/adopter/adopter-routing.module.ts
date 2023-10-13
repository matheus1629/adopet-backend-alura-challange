import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdopterComponent } from './adopter.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: AdopterComponent },
  { path: 'register', component: RegisterAdopterComponent },
  { path: 'profile', component: ProfileAdopterComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopterRoutingModule {}
