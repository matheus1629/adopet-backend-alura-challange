import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('user_token_adopet');

  if (route.routeConfig?.path === 'register') {
    return true;
  } else if (token) {
    const userType = localStorage.getItem('user_type_adopet');
    const routeType = route.data['routeType'];

    if (userType === routeType) {
      return true;
    } else if (userType === 'Donor' && routeType === 'Adopter') {
      router.navigate(['donor/pets']);
      return false;
    } else if (userType === 'Adopter' && routeType === 'Donor') {
      router.navigate(['adopter/pets']);
      return false;
    }

    return false;
  } else {
    router.navigate(['']);
    return false;
  }
};

export const loginGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('user_token_adopet');

  if (token) {
    const userType = localStorage.getItem('user_type_adopet');

    if (userType === 'Adopter') router.navigate(['/adopter/pets']);
    if (userType === 'Donor') router.navigate(['/donor/pets']);

    return false;
  } else {
    return true;
  }
};
