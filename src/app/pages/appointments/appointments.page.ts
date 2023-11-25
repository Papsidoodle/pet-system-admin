import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';

import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

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

  header: string = '';

  constructor(
    private actRoute: ActivatedRoute, 
    private sched: ScheduleService
  ) { }

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    // const petId = this.actRoute.snapshot.paramMap.get('petId')
    const appType = this.actRoute.snapshot.paramMap.get('appointmentType')

    this.header = appointmentTypes[appType];

    // this.appointments = this.sched
    //   .getSchedulesByPetId(userId, petId)
    //   .subscribe((schedules) => {
    //     this.apps = schedules;
    // });

    this.appointments = this.sched
      .getSchedulesByAppId(userId, Number(appType))
      .subscribe((appointment) => {
        this.apps = appointment
        console.log(this.apps)
    });
  }
}
