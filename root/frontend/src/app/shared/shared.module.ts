import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent],
  exports: [HeaderComponent, ButtonComponent],
  imports: [CommonModule, RouterModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule],
})
export class SharedModule {}
