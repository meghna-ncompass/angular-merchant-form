import { Injectable } from '@angular/core';
import { User } from './user';
import { map, Observable, of } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { StringLike } from '@firebase/util';
import { AuthenticationService } from './authentication.service';

export interface Category {
  Clothes: string;
  Digital: string;
  Electronics: string;
  Groceries: string;
  Toys: string;
}

export interface PaymentObj {
  checked: boolean;
  value: string;
}

export interface Payments {
  'Card Payment': PaymentObj;
  'Cash On Delivery': PaymentObj;
  UPI: PaymentObj;
}

export interface Type {
  Enterprise: string;
  Entrepreneur: string;
  'Small Business': string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private merchantsCollection: AngularFirestoreCollection<User>;
  formElement: Observable<any>;
  merchants: Observable<User[]>;
  merchantDoc!: AngularFirestoreDocument<User>;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService
  ) {
    // this.authService.user.subscribe((data) => {
    //   this.defaultUser.createdBy = data.email;
    //   this.isUserSignedIn = true;
    // });
    this.merchantsCollection = afs.collection<User>('merchantFormMeghna');
    this.merchants = this.merchantsCollection.valueChanges({
      idField: 'customID',
    });
  }
  users: User[] = [];
  user!: User;
  getUsers(): Observable<User[]> {
    return this.merchants;
  }
  getUser(id: string): Observable<User> {
    const merchant = this.merchants.pipe(
      map((data: any) => data.find((user: User) => user.id === id)!)
    );
    return merchant;
  }
  addNewUser(user: User) {
    console.log('ADDING NEW USER', user);
    this.merchantsCollection.doc(user.id).set(user);
  }
  editUser(user: User, id: string): void {
    this.merchantDoc = this.afs.doc<User>(`merchantFormMeghna/${id}`);
    this.merchantDoc.update(user);
  }
  deleteUser(id: string): void {
    this.merchantDoc = this.afs.doc<User>(`merchantFormMeghna/${id}`);
    this.merchantDoc.delete();
  }
  getFormElements() {
    const FormElementCollection: AngularFirestoreCollection =
      this.afs.collection('FormElements');
    const formElement = FormElementCollection.valueChanges();
    console.log('FORM ELEMENT', formElement);
    return formElement;
  }
}
