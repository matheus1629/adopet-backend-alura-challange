import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate?: () => boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => (component.canDeactivate ? component.canDeactivate() : true);
