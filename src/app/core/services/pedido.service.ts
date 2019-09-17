import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../../auth/pages/interfaces/pedido';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidosCollection: AngularFirestoreCollection<Pedido>;

  constructor(private afs: AngularFirestore) {
    this.pedidosCollection = this.afs.collection<Pedido>('Pedidos');
  }

  // código que permite pegar o id do produto
  getPedidos() {
    return this.pedidosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addPedido(pedido: Pedido) {
    return this.pedidosCollection.add(pedido);
  }

  getPedido(id: string) {
    return this.pedidosCollection.doc<Pedido>(id).valueChanges();
  }

  updatePedido(id: string, pedido: Pedido) {
    return this.pedidosCollection.doc<Pedido>(id).update(pedido);
  }

  deletePedido(id: string) {
    return this.pedidosCollection.doc(id).delete();
  }
}
