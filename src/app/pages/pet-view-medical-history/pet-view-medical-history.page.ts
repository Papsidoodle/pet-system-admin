import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetMedicalHistory } from 'src/app/models/pets-appointment';
import { MedicalHistoryService } from 'src/app/services/pet/medical-history/medical-history.service';
import { formatDate } from '../appointments/appointments.page';

@Component({
  selector: 'app-pet-view-medical-history',
  templateUrl: './pet-view-medical-history.page.html',
  styleUrls: ['./pet-view-medical-history.page.scss'],
})
export class PetViewMedicalHistoryPage implements OnInit {
  medicalHistories: PetMedicalHistory={};
  medicalHistorySubs: Subscription;
  userId: string;
  petId:string;
  constructor(
    private actRoute: ActivatedRoute,
    private medicalHistoryService: MedicalHistoryService,
    ) { }

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const medHistoryId = this.actRoute.snapshot.paramMap.get('medicalHistoryId');

    this.medicalHistorySubs = this.medicalHistoryService
    .getMedicalHistoryById(userId, medHistoryId)
    .subscribe((medicalHistory) => {
      medicalHistory.medicalHistoryDate = formatDate(medicalHistory.medicalHistoryDate.toDate());
      this.medicalHistories = medicalHistory;
    });
  }

}
