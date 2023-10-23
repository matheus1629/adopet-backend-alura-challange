import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IPopup } from 'src/shared/interfaces/popup.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  inputData!: IPopup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPopup,
    private ref: MatDialogRef<PopupComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
  }

  closePopup() {
    this.ref.close();
  }
}
