import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { IButtonConfig } from 'src/shared/interfaces/buttonConfig.interface';
import { ButtonClass } from 'src/shared/enums/buttonConfig.enum';
import { errorMessages, inputValidations } from 'src/shared/consts';
import { telMask } from 'src/shared/utils/form';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonRegister: IButtonConfig = {
    innerText: 'Login',
    class: ButtonClass.BUTTON_TYPE_2,
    loading: false,
  };

  errorMessages = errorMessages;
  inputValidations = inputValidations;
  formSubmitted = false;
  invalidLoginError = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userType: [null, [Validators.required]],
      email: ['jonh@email.com', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['qweqwe12', [Validators.required]],
    });
  }

  telMaskForm(): string {
    return telMask(this.loginForm.value.phoneNumber as string);
  }

  openPopup(message: string, icon: string) {
    this.dialog.open(PopupComponent, {
      data: {
        title: message,
        icon: icon,
      },
    });
  }

  submit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.buttonRegister.loading = true;

      this.loginForm.get('email')?.value.trim();

      this.authService
        .login(this.loginForm.value, this.loginForm.get('userType')?.value)
        .subscribe({
          next: (data) => {
            localStorage.setItem('user_token_adopet', data.token);
            localStorage.setItem('user_type_adopet', data.userType);

            if (data.userType === 'Adopter') this.router.navigate(['adopter/home']);
            if (data.userType === 'Donor') this.router.navigate(['donor/pets']);
          },
          error: (err) => {
            if (err.status === 401) {
              this.openPopup(
                'Email ou senha incorreto. Verifique também o tipo da conta.',
                'error'
              );
              this.loginForm.setErrors({ loginInvalid: true });
              this.invalidLoginError = true;
            } else this.openPopup('Ocorreu um erro em nosso servidor.', 'error');

            this.buttonRegister.loading = false;
          },
        });
    }
  }
}
