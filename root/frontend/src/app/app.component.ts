import { Component, Input, Output } from '@angular/core';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  buttonConfig: IButtonConfig = {
    innerText: 'teste',
    class: ButtonClass.BUTTON_TYPE_1,
  };
}
