import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../auth/pages/interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProteticoService {
  private proteticosCollection: AngularFirestoreCollection<User>;
  private dentistasCollection: AngularFirestoreCollection<User>;
  // proteticos: Observable<User[]>;

  constructor(private afs: AngularFirestore) {

    this.proteticosCollection = afs.collection<User>('Protetico');
    this.dentistasCollection = afs.collection<User>('Dentista');

    // this.proteticos = this.proteticosCollection.valueChanges();
   }

  getUsers() {

    return this.dentistasCollection.snapshotChanges().pipe(
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
    return this.dentistasCollection.doc<User>(id).valueChanges();
  }
}
