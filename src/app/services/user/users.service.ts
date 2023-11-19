import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docSnapshots,
} from '@angular/fire/firestore';
import { orderBy, query, setDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { User } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  getUsersInfo(): Observable<User[] | any> {
    const ref = collection(this.firestore, 'users');
    const sort = query(ref, orderBy('firstname'));
    return collectionData(sort, { idField: 'id' }).pipe(
      map((info) => info as User[])
    );
  }

  getUsersInfoById(uid: string): Observable<User> {
    const document = doc(this.firestore, `users/${uid}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const data = doc.data();
        return { ...data } as User;
      })
    );
  }

  getUsersPetById(uid: string): Observable<PetsInfo> {
    const document = doc(this.firestore, `pets/${uid}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const data = doc.data();
        return { ...data } as PetsInfo;
      })
    );
  }

  addPetInfo(pet: PetsInfo): Observable<void> {
    const ref = doc(this.firestore, 'pets', pet.petID);
    return from(setDoc(ref, pet));
  }
}
