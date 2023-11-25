import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { map } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private firestore: Firestore) {}

  getSchedulesByPetIdAndType(petId: string, type: number) {
    const schedules = collection(this.firestore, 'schedules');
    const queriedSchedule = query(
      schedules,
      where('petId', '==', petId),
      where('type', '==', type)
    );

    const petSchedules = collectionData(queriedSchedule).pipe(
      map((schedule) => {
        return schedule as PetsAppointment[];
      })
    );

    return petSchedules;
  }
}
