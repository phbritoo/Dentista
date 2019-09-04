import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propriedade fAuth criada no construtor que exporta do core.modules -> AngularFireAuthModeule o serviço AngularFireAuth
  constructor(private fAuth: AngularFireAuth) {}

  // Metodo de autenticacao para o login e passaword
  private signInEmailPassword({ email, password }): Promise<auth.UserCredential> {
    return this.fAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
