import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { BackgroundComponent } from './background/background.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterAdopterComponent } from './pages/registerAdopter/registerAdopter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    WelcomeComponent,
    FooterComponent,
    RegisterAdopterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AppModule {}
