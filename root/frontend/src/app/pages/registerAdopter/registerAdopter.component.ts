import { Component, OnInit } from '@angular/core';
import {
  ButtonClass,
  IButtonConfig,
} from 'src/interfaces/buttonConfig.interface';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-adopter',
  templateUrl: './registerAdopter.component.html',
  styleUrls: ['./registerAdopter.component.scss'],
})
export class RegisterAdopterComponent implements OnInit {
  

  buttonRegister: IButtonConfig = {
    innerText: 'Cadastrar',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  constructor(private fb: FormBuilder) {}

  registerAdopterForm = this.fb.group({
    firstName:[''],
    lastName:[''],
    telephone:[''],
    city:[''],
    state:[''],
    email:[''],
    password:[''],
    passwordConfirmation:[''],
  })

  ngOnInit(): void {

  }

  buttonRegisterAdopter(){
    
  }
}
