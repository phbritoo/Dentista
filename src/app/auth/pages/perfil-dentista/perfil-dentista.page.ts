import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-dentista',
  templateUrl: './perfil-dentista.page.html',
  styleUrls: ['./perfil-dentista.page.scss'],
})
export class PerfilDentistaPage implements OnInit {
  atualizarDentista: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  ionViewDidLeave() {
    this.createForm();
  }
  // validacoes do formulario
  private createForm(): void {
    this.atualizarDentista = this.fb.group({
      telefone: ['', [Validators.required, Validators.minLength(15)]],
      cpf: ['', [Validators.required, Validators.minLength(14)]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      cro: ['', [Validators.required, Validators.minLength(4)]],
      criadoEm: [new Date().getTime()],
      isDentista: [true]
    });
  }

  dateChanged(date) {
    this.atualizarDentista.patchValue({
      data: date.detail.value.substring(0, 10)
    });
  }
}
