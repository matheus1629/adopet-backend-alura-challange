import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  buttonLogin: IButtonConfig = {
    innerText: 'Login',
    class: ButtonClass.BUTTON_TYPE_1,
  };
  buttonRegisterAdopter: IButtonConfig = {
    innerText: 'Criar conta para adotar pet',
    class: ButtonClass.BUTTON_TYPE_1,
  };
  buttonRegisterDonor: IButtonConfig = {
    innerText: 'Criar conta para doar pet',
    class: ButtonClass.BUTTON_TYPE_1,
  };

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
