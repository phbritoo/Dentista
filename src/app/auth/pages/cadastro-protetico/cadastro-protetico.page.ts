import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-protetico',
  templateUrl: './cadastro-protetico.page.html',
  styleUrls: ['./cadastro-protetico.page.scss']
})
export class CadastroProteticoPage implements OnInit {
  cadastrarProtetico: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.cadastrarProtetico = this.fb.group({
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]]
    });
  }
  // mostrar mensagem de erro no ion-note
  get email(): FormControl {
    return this.cadastrarProtetico.get('email') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get senha(): FormControl {
    return this.cadastrarProtetico.get('senha') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get nome(): FormControl {
    return this.cadastrarProtetico.get('nome') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get cpf(): FormControl {
    return this.cadastrarProtetico.get('cpf') as FormControl;
  }
  // mostrar mensagem de erro no ion-note
  get telefone(): FormControl {
    return this.cadastrarProtetico.get('telefone') as FormControl;
  }

  // mostrar mensagem de erro no ion-note
  get data(): FormControl {
    return this.cadastrarProtetico.get('data') as FormControl;
  }

  efetuarCadastroProtetico(): void {
    console.log('cadastrarProtetico: ', this.cadastrarProtetico.value);
  }

  botaoVoltar() {
    this.router.navigateByUrl('/login');
  }
}
