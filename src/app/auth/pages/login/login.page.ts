import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.formLogin.get('senha') as FormControl;
  }
  fazerLogin(): void {
    console.log('formLogin: ', this.formLogin.value);
  }
  cadastrarProtetico() {
    this.router.navigateByUrl('/cadastro-protetico');
  }
  cadastrarDentista() {
    this.router.navigateByUrl('/cadastro-dentista');
  }
  esqueceuSenha() {
    this.router.navigateByUrl('/');
  }
}
