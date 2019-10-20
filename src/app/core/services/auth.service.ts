import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../auth/pages/interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;
  // Propriedade afa criada no construtor que exporta do core.modules -> AngularFireAuthModeule o serviço AngularFireAuth
  constructor(private afa: AngularFireAuth) {
    this.authState$ = this.afa.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  // Metodo de autenticacao para o login e passaword
  // login(user: User) {
  //   return this.afa.auth.signInWithEmailAndPassword(user.email, user.senha);
  // }
  login({ email, senha }: User): Promise<auth.UserCredential> {
    return this.afa.auth.signInWithEmailAndPassword(email, senha);
  }

  // register(user: User) {
  //   return this.afa.auth.createUserWithEmailAndPassword(user.email, user.senha);
  // }

  register({ email, senha, nome }: User): Promise<auth.UserCredential> {
    return this.afa.auth
      .createUserWithEmailAndPassword(email, senha)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: nome, photoURL: null })
          .then(() => credentials)
      );
  }

  logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
  // Implementacao do metrodo esqueci a senha
  resetPassword(email: string) {
    this.afa.auth.sendPasswordResetEmail(email.toString().trim());

    // .then(() => console.log('email enviado'))
    // .catch(error => console.log(error));
  }
}
