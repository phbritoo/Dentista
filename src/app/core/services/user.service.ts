import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../auth/pages/interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('User');
    // this.users = this.usersCollection.valueChanges();
   }

  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getUser(id: string) {
    return this.usersCollection.doc<User>(id).valueChanges();
  }

  async getUserName(id: string) {
    const userRef = this.afs.collection('User').doc(id);
    let userNome: any;
    try {
      const doc = await userRef.get()
        .toPromise();
      if (!doc.exists) {
        console.log('Não existe documento');
      } else {
        userNome = doc.get('nome');
        console.log('console Log do Método, pegou o get(nome)' + userNome);
      }
    } catch (err) {
      console.log('Erro ao recuperar documento', err);
    }
    return userNome;
  }
}
