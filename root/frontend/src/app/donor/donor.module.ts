import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { DonorRoutingModule } from './donor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { DonorComponent } from './donor.component';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { PetsDonorComponent } from './pages/pets-donor/pets-donor.component';

@NgModule({
  declarations: [DonorComponent, ProfileDonorComponent, RegisterDonorComponent, PetsDonorComponent],
  imports: [
    CommonModule,
    DonorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
  ],
})
export class DonorModule {}
