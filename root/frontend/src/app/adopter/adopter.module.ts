import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { AdopterRoutingModule } from './adopter-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { HomeComponent } from './pages/home/home.component';
import { AdopterComponent } from './adopter.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';

@NgModule({
  declarations: [
    AdopterComponent,
    ProfileAdopterComponent,
    RegisterAdopterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdopterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
  ],
})
export class AdopterModule {}
