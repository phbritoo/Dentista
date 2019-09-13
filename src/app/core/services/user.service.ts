import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
  email: string;
  uid: string;
  desc: string;
  nome: string;
  cpf: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user;

  constructor(private afAuth: AngularFireAuth) { }
  setUser(user: user) {
    this.user = user;
  }
  getEmail(): string {
    return this.user.email;
  }
  getDesc(): string {
    return this.user.desc;
  }
  getUID(): string {
    return this.user.uid;
  }
}
