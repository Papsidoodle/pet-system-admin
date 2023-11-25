import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

const appointmentTypes = [
  'Tick and Flea / Heartworm Preventative',
  'Deworming Schedule',
  'Vaccination Schedule',
];

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  schedules: PetsAppointment[];
  schedulesSubscription: Subscription;
  header: number;

  constructor(
    private actRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit() {
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const appointmentType =
      this.actRoute.snapshot.paramMap.get('appointmentType');
      
    this.header = appointmentTypes[appointmentType];

    this.schedulesSubscription = this.scheduleService
      .getSchedulesByPetIdAndType(petId, Number(appointmentType))
      .subscribe((schedules) => {
        this.schedules = schedules;
    });
  }
}
