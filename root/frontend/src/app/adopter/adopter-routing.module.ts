import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdopterComponent } from './adopter.component';
import { RegisterAdopterComponent } from './pages/register-adopter/register-adopter.component';
import { ProfileAdopterComponent } from './pages/profile-adopter/profile-adopter.component';
import { PetsAdopterComponent } from './pages/pets-adopter/pets-adopter.component';

import { canDeactivateGuard } from '../guard/can-deactivate.guard';
import { SendMessageComponent } from './pages/send-message/send-message.component';

const routes: Routes = [
  { path: '', component: AdopterComponent },
  { path: 'register', component: RegisterAdopterComponent },
  {
    path: 'profile',
    component: ProfileAdopterComponent,
    canDeactivate: [canDeactivateGuard],
  },
  { path: 'pets', component: PetsAdopterComponent },
  {
    path: 'send-message',
    component: SendMessageComponent,
    canDeactivate: [canDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopterRoutingModule {}
