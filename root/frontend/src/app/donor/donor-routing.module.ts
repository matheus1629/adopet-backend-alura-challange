import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorComponent } from './donor.component';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';
import { PetsDonorComponent } from './pages/pets-donor/pets-donor.component';
import { AddPetComponent } from './pages/add-pet/add-pet.component';
import { EditPetComponent } from './pages/edit-pet/edit-pet.component';

const routes: Routes = [
  { path: '', component: DonorComponent },
  { path: 'register', component: RegisterDonorComponent },
  { path: 'profile', component: ProfileDonorComponent },
  { path: 'pets', component: PetsDonorComponent },
  { path: 'add-pet', component: AddPetComponent },
  { path: 'edit-pet', component: EditPetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorRoutingModule {}
