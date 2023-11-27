import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateChildFn } from '@angular/router';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard, loginGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  {
    path: 'adopter',
    loadChildren: () => import('./adopter/adopter.module').then((m) => m.AdopterModule),
    canActivateChild: [authGuard],
    data: { routeType: 'Adopter' },
  },
  {
    path: 'donor',
    loadChildren: () => import('./donor/donor.module').then((m) => m.DonorModule),
    canActivateChild: [authGuard],
    data: { routeType: 'Donor' },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
