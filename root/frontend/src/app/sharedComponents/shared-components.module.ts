import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { PopupComponent } from './popup/popup.component';
import { PopupConfirmComponent } from './popupConfirm/popup-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MessagesTableComponent } from './messages-table/messages-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BindQueryParamDirective } from './bind-query-param.directive';
import { LodingComponent } from './loding/loding.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    PopupComponent,
    PopupConfirmComponent,
    MessagesTableComponent,
    BindQueryParamDirective,
    LodingComponent,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    PopupComponent,
    PopupConfirmComponent,
    MessagesTableComponent,
    LodingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
})
export class SharedComponentsModule {}
