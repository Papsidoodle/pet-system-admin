import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docSnapshots,
  deleteDoc,
} from '@angular/fire/firestore';
import { orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfo } from '../../../models/pets';
import { User } from '../../user/users';
@Injectable({
  providedIn: 'root',
})
export class PetsInfoService {
  constructor(private firestore: Firestore) {}

  public pet: Observable<PetsInfo>;
  public user: Observable<User>;

  getPetsInfo(petId: string): Observable<PetsInfo> {
    const document = doc(this.firestore, `pets/${petId}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const data = doc.data();
        return { ...data } as PetsInfo;
      })
    );
  }

  getPetAppointmentsByType(
    petId: string,
    appointmentType: number
  ): Observable<PetsAppointment[] | any> {
    const ref = collection(this.firestore, `pets/${petId}/medicalHistory`);
    const appointments = query(
      ref,
      where('appointmentType', '==', appointmentType)
    );

    return collectionData(appointments).pipe(
      map((appointment) => {
        return appointment as PetsAppointment[];
      })
    );
  }

  addPetInfo(userId: string, petInfo: any): Observable<void> {
    const col = collection(this.firestore, `pets/${userId}/petInfo`);
    const ref = doc(col);
    const petWithId = { ...petInfo, petId: ref.id };
    return from(setDoc(ref, petWithId));
  }

  updatePetInfo(userId: string, petInfo: PetsInfo): Observable<void> {
    const docRef = doc(
      this.firestore,
      `pets/${userId}/petInfo/${petInfo.petId}`
    );
    return from(setDoc(docRef, petInfo));
  }

  deletePet(userId: string[], petId: string) {
    const petReference = doc(this.firestore, `pets/${userId}/petInfo/${petId}`);
    return from(deleteDoc(petReference));
  }

  getUserPet(uid: string): Observable<PetsInfo[] | any> {
    const ref = collection(this.firestore, `pets/${uid}/petInfo`);
    const pets = query(ref, orderBy('petName'));

    return collectionData(pets).pipe(
      map((pet) => {
        return pet as PetsInfo[];
      })
    );
  }

  getPetInfo(uid: string, petId: string): Observable<PetsInfo | any> {
    const ref = collection(this.firestore, `pets/${uid}/petInfo`);
    const pet = query(ref, where('petId', '==', petId));

    return collectionData(pet).pipe(
      map((pet) => {
        return pet as PetsInfo[];
      })
    );
  }

  addMedicalHistory(petID: string, medicalHistory: any): Observable<void> {
    const col = collection(this.firestore, `pets/${petID}/medicalHistory`);
    const newDocRef = doc(col);
    return from(setDoc(newDocRef, medicalHistory));
  }
}
