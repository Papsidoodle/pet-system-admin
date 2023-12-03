import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';

import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
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
  '5in1 / 6in1 / 8in1',
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
  petId: string;
  header: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private sched: ScheduleService
  ) { }

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    this.userId = userId;
    this.petId = petId;
    // const petId = this.actRoute.snapshot.paramMap.get('petId')
    const appType = this.actRoute.snapshot.paramMap.get('appointmentType');

    this.header = appointmentTypes[appType];

    this.appointments = this.sched
      .getSchedulesByAppType(userId, petId, Number(appType))
      .subscribe((appointment) => {
        appointment.map((data:PetsAppointment) => {
          data.appointmentDate = formatDate(data.appointmentDate.toDate());
        });
        this.apps = appointment;
      });
  }
}
