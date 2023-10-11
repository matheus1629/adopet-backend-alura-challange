import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdopterRoutingModule } from './adopter-routing.module';
import { AdopterComponent } from './adopter.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';

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
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class AdopterModule {}
