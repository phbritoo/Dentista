import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Propriedade afa criada no construtor que exporta do core.modules -> AngularFireAuthModeule o serviço AngularFireAuth
  constructor(
    private afa: AngularFireAuth
  ) { }

  // Metodo de autenticacao para o login e passaword
  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}
