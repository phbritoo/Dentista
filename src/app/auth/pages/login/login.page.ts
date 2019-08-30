import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar Conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  //validacoes do formulario
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.authForm.get('senha') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.authForm.get('nome') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Cadastre-se';
    this.configs.actionChange = isSignIn ? 'Criar Conta ' : 'Já tem uma conta ?';
    !isSignIn
      ? this.authForm.addControl('nome', this.nameControl)
      : this.authForm.removeControl('nome');
  }

  fazerLogin(): void {
    console.log('AuthForm: ', this.authForm.value);
  }
}
