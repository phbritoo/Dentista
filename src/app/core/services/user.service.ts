import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
  username: string;
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
  getUsername(): string {
    return this.user.username;
  }
  getDesc(): string {
    return this.user.desc;
  }
  getUID(): string {
    return this.user.uid;
  }
}
