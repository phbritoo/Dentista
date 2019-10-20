import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {}

  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  // Obtem todos os dados que estao no firestore
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }
}
