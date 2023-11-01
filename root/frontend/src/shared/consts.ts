import { PageEvent } from '@angular/material/paginator';
export const maxLengthForm = 255;
export const maxLengthPassword = 16;
export const inputValidations = {
  maxLengthForm: 225,
  maxLengthPassword: 16,
};
export const textAreaValidation = 2000;

export const errorMessages = {
  login: 'Email ou senha incorreto. Verifique também o tipo da conta.',
  requiredInput: 'Campo obrigatório.',
  radioInput: 'Selecione uma opção',
  fileSizeExceeded: 'Tamanho máximo de 5mb excedido',
  fileUnsupported: 'O arquivo precisa ser JPEG ou PNG',
  validName: 'Este campo só pode conter letras.',
  minlength: 'Este campo precisa ter no mínimo 2 caracteres.',
  petAge: 'Digite um valor inteiro de 0 a 99.',
  select: 'Selecione uma opção.',
  phoneNumber: 'Digite um número válido.',
  email: 'Digite um email válido.',
  password: 'A senha precisa ter entre 8 e 16 caracteres, tendo ao menos uma letra e um número.',
  confirmPassword: 'As senhas precisam ser iguais.',
};
export const errorMessageMinLength = 'Este campo precisa ter no mínimo 2 caracteres.';
export const errorMessageSelect = 'Você precisa selecionar uma opção.';
