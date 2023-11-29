import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { AdopterRoutingModule } from './adopter-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedComponentsModule } from '../sharedComponents/shared-components.module';

import { PetsAdopterComponent } from './pages/pets-adopter/pets-adopter.component';
import { AdopterComponent } from './adopter.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { SendMessageComponent } from './pages/send-message/send-message.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessageDetailsComponent } from './pages/message-details/message-details.component';

@NgModule({
  declarations: [
    AdopterComponent,
    ProfileAdopterComponent,
    RegisterAdopterComponent,
    PetsAdopterComponent,
    SendMessageComponent,
    MessagesComponent,
    MessageDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdopterRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    MatPaginatorModule,
  ],
})
export class AdopterModule {}
