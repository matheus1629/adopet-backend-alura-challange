import { Component, OnInit } from '@angular/core';
import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { states } from 'src/shared/enums/states.enum';

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

  estados = states;
  estadosKeys = Object.values(this.estados);

  registerAdopterForm = this.fb.group(
    {
      firstName: ['', [Validators.minLength(2), Validators.maxLength(255)]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.minLength(2), Validators.maxLength(11)]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', Validators.required],
      email: ['', Validators.email, Validators.maxLength(255)],
      password: [
        '',
        Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,16}$'),
      ],
      passwordConfirmation: [''],
  },
    
  );

  ngOnInit(): void {
    
  }

/*   passwordConfirmationValidator(formGroup: FormGroup) {
    // obtém os valores dos campos password e passwordConfirmation
    let password = formGroup.get('password')?.value;
    let passwordConfirmation = formGroup.get('passwordConfirmation')?.value;
    // verifica se os valores são iguais
    let valid = password === passwordConfirmation;
    // retorna o objeto com o erro ou null
    return valid ? null : { passwordConfirmation: true };
  } */

  telMask = () => {
    let value = this.registerAdopterForm.value.phoneNumber as string;

    if (value.charAt(2) === '9') {
      return '(00) 00000-0000';
    } else {
      return '(00) 0000-0000';
    }
  };

  submit() {
    console.log(this.registerAdopterForm.value);
    console.log(this.registerAdopterForm.errors);
  }
}
