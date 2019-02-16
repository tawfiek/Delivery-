import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Order} from '../../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class NewOrdersService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private readonly orders: Observable<Order[]>;

  constructor(private db: AngularFirestore) {
    this.ordersCollection = db.collection<Order>('orders');
    this.orders = this.ordersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getOrders () {
    return this.orders;
  }

  getOrder (id) {
    return this.ordersCollection.doc(id).valueChanges();
  }

  updateOrders(order: Order, id: string) {
    return this.ordersCollection.doc(id).update(order);
  }

  addOrder(order: Order) {
    return this.ordersCollection.add(order);
  }

  removeOrder(id) {
    return this.ordersCollection.doc(id).delete();
  }

}
