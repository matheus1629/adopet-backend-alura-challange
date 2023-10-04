import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { telMask } from 'src/shared/utils/form';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonRegister: IButtonConfig = {
    innerText: 'Login',
    class: ButtonClass.BUTTON_TYPE_2,
  };

  errorMessages = errorMessages;
  inputValidations = inputValidations;
  formSubmitted = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userType: ['', [Validators.required]],
      email: ['jonh@email.com', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['qweqwe12', [Validators.required]],
    });
  }

  telMaskForm(): string {
    return telMask(this.loginForm.value.phoneNumber as string);
  }

  submit() {
    this.formSubmitted = true;

    console.log(this.loginForm.value);
    console.log(this.loginForm.get('userType')?.value);
    if (this.loginForm.valid) {
      this.loginForm.get('email')?.value.trim();

      this.authService
        .login(this.loginForm.value, this.loginForm.get('userType')?.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            localStorage.setItem('user_token_adopet', data);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error: ', err);
          },
        });
    }
  }
}
