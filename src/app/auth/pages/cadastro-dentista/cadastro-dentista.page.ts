import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-dentista',
  templateUrl: './cadastro-dentista.page.html',
  styleUrls: ['./cadastro-dentista.page.scss']
})
export class CadastroDentistaPage implements OnInit {
  cadastrarDentista: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  // validacoes do formulario
  private createForm(): void {
    this.cadastrarDentista = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      cro: ['', [Validators.required, Validators.minLength(4)]],
      data: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.cadastrarDentista.get('nome') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get cpf(): FormControl {
    return this.cadastrarDentista.get('cpf') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get cro(): FormControl {
    return this.cadastrarDentista.get('cro') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get data(): FormControl {
    return this.cadastrarDentista.get('data') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get telefone(): FormControl {
    return this.cadastrarDentista.get('telefone') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.cadastrarDentista.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.cadastrarDentista.get('senha') as FormControl;
  }

  efetuarCadastroDentista(): void {
    console.log('cadastrarDentista: ', this.cadastrarDentista.value);
  }

  botaoVoltar() {
    this.router.navigateByUrl('/login');
  }
}
