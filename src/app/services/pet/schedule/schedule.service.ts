import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, orderBy, query, setDoc, where } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  
  constructor(
    private firestore: Firestore
  ) {}

  addSchedule(userId: string, appointmentInfo: any): Observable<void> {
    const col = collection(this.firestore, `pets/${userId}/appointmentSchedule`);
    const ref = doc(col);
    const schedId = {...appointmentInfo, appointmentId: ref.id}
    return from(setDoc(ref, schedId));
  }

  // query data by petId and appointmentType
  getSchedulesByAppId(uid: string, appointmentType: number): Observable<PetsAppointment[] | any> {
    const schedules = collection(this.firestore, `pets/${uid}/appointmentSchedule`);
    const queriedSchedule = query(schedules, where('appointmentType', '==', appointmentType));

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }

  // query data by petId and appointmentType
  getSchedulesByPetId(uid: string, petId: string): Observable<PetsAppointment[] | any> {
    const schedules = collection(this.firestore, `pets/${uid}/appointmentSchedule`);
    const queriedSchedule = query(
      schedules,
      where('petId', '==', petId),
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }
}
