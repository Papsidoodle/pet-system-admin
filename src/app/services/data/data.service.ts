import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';
import { Data } from 'src/app/models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore
  ) { }

  getInfo(): Observable<Data[]> {
    const infoCollection = collection(this.firestore, 'info');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(infoCollection, {idField: 'id'})
    .pipe(
      map(info => info as Data[])
    );
  }

  getInfotById(id: string): Observable<Data> {
    const document = doc(this.firestore, `info/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Data;
      })
    );
  }
  
  createInfo(info: Data): Promise<void> {
    const document = doc(collection(this.firestore, 'info'));
    return setDoc(document, info);
  }

  updateInfo(info: Data): Promise<void> {
    const document = doc(this.firestore, 'info', info?.id);
    const { id, ...data } = info; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteContact(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
