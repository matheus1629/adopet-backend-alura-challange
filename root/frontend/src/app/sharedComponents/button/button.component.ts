import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';

@Component({
  selector: 'app-button',

  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonConfig!: IButtonConfig;
}
