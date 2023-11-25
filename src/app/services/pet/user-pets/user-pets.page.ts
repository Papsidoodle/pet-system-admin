import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';

@Component({
  selector: 'app-user-pets',
  templateUrl: './user-pets.page.html',
  styleUrls: ['./user-pets.page.scss'],
})
export class UserPetsPage implements OnInit {
  public petInfo!: PetsInfo| any;
  public petAppointments: PetsAppointment[];

  petInfoSub: Subscription;
  petAppointmentsSub: Subscription;

  constructor(
    private firestore: Firestore,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const appointmentType = this.actRoute.snapshot.paramMap.get('appointmentType');

    (this.petInfoSub = this.petsService.getPetsInfo(petId)
      .subscribe((petInfo) => {
        this.petInfo = petInfo;
      }
    )),
    (this.petAppointmentsSub = this.petsService.getPetAppointmentsByType(petId, parseInt(appointmentType))
      .subscribe((petAppointments) => {
        this.petAppointments = petAppointments;
        console.log(petAppointments);
      }
    ));
  }
}
