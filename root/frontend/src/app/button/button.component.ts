import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.buttonConfig.class);
  }
  @Input() buttonConfig!: IButtonConfig;
}
