import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileDonorComponent } from './pages/profile-donor/profile-donor.component';
import { PopupComponent } from './popup/popup.component';
import { PetsDonorComponent } from './pages/pets-donor/pets-donor.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    WelcomeComponent,
    FooterComponent,
    RegisterDonorComponent,
    LoginComponent,
    ProfileDonorComponent,
    PopupComponent,
    PetsDonorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
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
export class AppModule {}
