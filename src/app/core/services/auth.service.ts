import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propriedade afa criada no construtor que exporta do core.modules -> AngularFireAuthModeule o serviço AngularFireAuth
  constructor(private afa: AngularFireAuth) {}

  // Metodo de autenticacao para o login e passaword
  private signInEmailPassword({ email, password }): Promise<auth.UserCredential> {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }
}
