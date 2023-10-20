import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DonorRoutingModule } from './donor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { DonorComponent } from './donor.component';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { PetsDonorComponent } from './pages/pets-donor/pets-donor.component';
import { AddPetComponent } from './pages/add-pet/add-pet.component';
import { EditPetComponent } from './pages/edit-pet/edit-pet.component';

@NgModule({
  declarations: [DonorComponent, ProfileDonorComponent, RegisterDonorComponent, PetsDonorComponent, AddPetComponent, EditPetComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    MatPaginatorModule,
  ],
})
export class DonorModule {}
