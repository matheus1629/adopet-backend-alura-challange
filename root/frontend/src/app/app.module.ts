import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { BackgroundComponent } from './background/background.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterDonorComponent } from './pages/register-donor/register-donor.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    WelcomeComponent,
    FooterComponent,
    RegisterAdopterComponent,
    RegisterDonorComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRadioModule,
  ],
})
export class AppModule {}
