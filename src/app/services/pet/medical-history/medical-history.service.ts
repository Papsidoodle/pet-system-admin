import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  docSnapshots,
} from '@angular/fire/firestore';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PetMedicalHistory } from 'src/app/models/pets-appointment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private firestore: Firestore) {}

  addMedicalHistory(userId: string, medicalInfo: PetMedicalHistory): Observable<void> {

    const col = collection(
      this.firestore,
      `pets/${userId}/medicalHistory`
    );
    medicalInfo.medicalHistoryDate = Timestamp.fromDate(
      new Date(medicalInfo.medicalHistoryDate)
    );
    const ref = doc(col);

    const schedId = { ...medicalInfo, medicalHistoryId: ref.id };
    return from(setDoc(ref, schedId));
  }

  updateMedicalHistory(userId: string, medicalHistoryId:string, medicalInfo: PetMedicalHistory): Promise<void> {
    const document = doc(
      this.firestore,
      `pets/${userId}/medicalHistory/${medicalHistoryId}`
    );
    medicalInfo.medicalHistoryDate = Timestamp.fromDate(new Date(medicalInfo.medicalHistoryDate));
    return setDoc(document, { ...medicalInfo, medicalHistoryId });
  }

  getMedicalHistoryById(
    uid: string,
    medicalHistoryId: string
  ): Observable<PetMedicalHistory> {
    const medicalHistory = doc(
      this.firestore,
      `pets/${uid}/medicalHistory/${medicalHistoryId}`
    );
    return docSnapshots(medicalHistory)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as PetMedicalHistory;
      })
    );
  }

  getMedicalHistoryByPetId(
    uid:string,
    petId:string,
  ):Observable<PetMedicalHistory[]>{
    const medicalHistories = collection(
      this.firestore,
      `pets/${uid}/medicalHistory`

    )    
    const queriedHistory = query(medicalHistories, where('petId', '==', petId));

    const petMedicalHistory = collectionData(queriedHistory).pipe(
      map((schedule) => {
        return schedule as PetMedicalHistory[];
      })
    );
    return petMedicalHistory;

  }
}
