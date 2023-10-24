import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { ENVIRONMENT } from './environment.token';
import { environment } from 'src/environments/environment';
import { UrlInterceptor } from './url.interceptor';

import { AppComponent } from './app.component';
import { SharedComponentsModule } from './sharedComponents/shared-components.module';
import { BackgroundComponent } from './background/background.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    WelcomeComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    SharedComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatIconModule
  ],
})
export class AppModule {}
