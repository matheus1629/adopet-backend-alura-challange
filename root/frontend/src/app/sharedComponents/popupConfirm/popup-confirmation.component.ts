import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IPopupConfirm } from 'src/shared/interfaces/popupConfirm.interface';

@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.scss'],
})
export class PopupConfirmComponent implements OnInit {
  inputData!: IPopupConfirm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPopupConfirm,
    private ref: MatDialogRef<PopupConfirmComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  noConfirmation() {
    this.ref.close(false);
  }

  confirmation() {
    this.ref.close(true);
  }
}
