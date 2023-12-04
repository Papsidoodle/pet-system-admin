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
  deleteDoc,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { imgInterface } from 'src/app/pages/homescreen/homescreen.page';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private firestore: Firestore) {}

  createPicture(img:string): Observable<void> {
    const document = doc(collection(this.firestore, 'announcement'))
    const imgId = { img, imgId: document.id };
    return from(setDoc(document, imgId));
  }
  
  getAnnoucements(): Observable<any> {
    const data = collection(this.firestore, 'announcement');
    const annoucements = collectionData(data).pipe(
      map((schedule) => {
        console.log(schedule)
        return schedule as imgInterface[];
      })
    );
    return annoucements
  }

  deleteAnnouncment(id: string): Promise<void> {
    console.log(id);
    const document = doc(this.firestore, 'announcement', id);
    return deleteDoc(document);
  }

  addSchedule(userId: string, appointmentInfo: any): Observable<void> {
    const col = collection(
      this.firestore,
      `pets/${userId}/appointmentSchedule`
    );
    appointmentInfo.appointmentDate = Timestamp.fromDate(
      new Date(appointmentInfo.appointmentDate)
    );
    const ref = doc(col);
    const schedId = { ...appointmentInfo, appointmentId: ref.id };
    return from(setDoc(ref, schedId));
  }

  updateScheduleInfo(
    userId: string,
    appointmentId: string,
    info: PetsAppointment
  ): Promise<void> {
    const document = doc(
      this.firestore,
      `pets/${userId}/appointmentSchedule/${appointmentId}`
    );
    info.appointmentDate = Timestamp.fromDate(new Date(info.appointmentDate));
    return setDoc(document, { ...info, appointmentId });
  }

  getSchedulesByAppId(
    uid: string,
    appointmentReference: string
  ): Observable<PetsAppointment> {
    const schedule = doc(
      this.firestore,
      `pets/${uid}/appointmentSchedule/${appointmentReference}`
    );
    return docSnapshots(schedule).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as PetsAppointment;
      })
    );
  }

  // query data by petId and appointmentType
  getSchedulesByPetId(
    uid: string,
    petId: string
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const queriedSchedule = query(schedules, where('petId', '==', petId));

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }

  getUnfinishedSchedulesByPetId(
    uid: string,
    petId: string
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const currentDate = new Date();
    const queriedSchedule = query(
      schedules,
      where('petId', '==', petId),
      where('appointmentDate', '>', currentDate)
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((appointments) => {
        const highestDates: PetsAppointment[] = [];

        appointments.forEach((appointment) => {
          const { appointmentType, appointmentDate } = appointment;
          if (
            highestDates[appointmentType] == null ||
            appointmentDate.toDate() <
              highestDates[appointmentType].appointmentDate.toDate()
          ) {
			if(appointmentType === 3){
				console.log({appointmentType:appointmentType,appointmentDate:appointmentDate.toDate()});
			}
			highestDates[appointmentType] = appointment;
          }
        });
		var finalSchedules = highestDates.filter(value => Object.keys(value).length !== 0);
		return finalSchedules;
      })
    );
    return petSchedules;
  }
  // query data by petId and appointmentType
  getSchedulesByAppType(
    uid: string,
	petId: string,
    appointmentType: number
  ): Observable<PetsAppointment[] | any> {
    const schedules = collection(
      this.firestore,
      `pets/${uid}/appointmentSchedule`
    );
    const currentDate = new Date();
    const queriedSchedule = query(
      schedules,
	  where('petId', '==', petId),
      where('appointmentType', '==', appointmentType),
      where('appointmentDate', '<', currentDate)
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );
    return petSchedules;
  }
}
