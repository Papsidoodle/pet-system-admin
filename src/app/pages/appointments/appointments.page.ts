import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';

import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}
const appointmentTypes = [
  'AntiRabies Schedule',
  'Deworming Schedule',
  'Kennel Cough Schedule',
  'Tick and Flea / Heartworm Preventative Schedule',
];

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  apps: PetsAppointment[];
  appointments: Subscription;
  userId: string;
  header: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private sched: ScheduleService
  ) {}

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    this.userId = userId;
    // const petId = this.actRoute.snapshot.paramMap.get('petId')
    const appType = this.actRoute.snapshot.paramMap.get('appointmentType');

    this.header = appointmentTypes[appType];

    // this.appointments = this.sched
    //   .getSchedulesByPetId(userId, petId)
    //   .subscribe((schedules) => {
    //     this.apps = schedules;
    // });

    this.appointments = this.sched
      .getSchedulesByAppType(userId, Number(appType))
      .subscribe((appointment) => {
        const formattedDates = appointment.map((data) => {
          data.appointmentDate = formatDate(data.appointmentDate.toDate());
        });
        this.apps = appointment;
      });
  }
}
