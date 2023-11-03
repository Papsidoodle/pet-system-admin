import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';
import { DogInfo } from './dog';
import { orderBy, query, where } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class DogsInfoService {

  constructor(private firestore: Firestore) {}

  getDogInfo(): Observable<DogInfo[]> {
    const infoCollection = collection(this.firestore, 'DogBreed');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(infoCollection, {idField: 'id'})
    .pipe(
      map(info => info as DogInfo[])
    );
  }

  getDogInfoAlphabetically(): Observable<DogInfo[]> {
    const infoCollection = collection(this.firestore, 'DogBreed');
    const sortedAlphabetical = query(
      infoCollection,
      orderBy('name')
    );

    // this method returns a stream of documents mapped to their payload and id
    return collectionData(sortedAlphabetical, {idField: 'id'})
    .pipe(
      map(info => info as DogInfo[])
    );
  }

  getDogInfotById(id: string): Observable<DogInfo> {
    const document = doc(this.firestore, `DogBreed/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as DogInfo;
      })
    );
  }

  createDogInfo(info: DogInfo): Promise<void> {
    const document = doc(collection(this.firestore, 'DogBreed'));
    return setDoc(document, info);
  }

  updateDogInfo(info: DogInfo): Promise<void> {
    const document = doc(this.firestore, 'DogBreed', info?.id);
    const { id, ...data } = info; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteDogInfo(id: string): Promise<void> {
    const document = doc(this.firestore, 'DogBreed', id);
    return deleteDoc(document);
  }

  searchDog(search:string): Observable<DogInfo[]>{
    const infoCollection = collection(this.firestore, 'DogBreed');
    const searchlower = search.toLowerCase();
    const squery =query(
      infoCollection,
      orderBy('name'),
      where('name', '>=', searchlower),
      where('name', '<=', searchlower + '\uf8ff')
    );
    return collectionData(squery,{idField:'id'}).pipe(
      map((info) => info as DogInfo[])
    );
  }
}
