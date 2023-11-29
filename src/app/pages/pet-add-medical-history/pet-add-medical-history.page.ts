import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PetMedicalHistory } from 'src/app/models/pets-appointment';
import { MedicalHistoryService } from 'src/app/services/pet/medical-history/medical-history.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-add-medical-history',
  templateUrl: './pet-add-medical-history.page.html',
  styleUrls: ['./pet-add-medical-history.page.scss'],
})
export class PetAddMedicalHistoryPage implements OnInit {
  petMedicalHistories: PetMedicalHistory[];
  petMedicalHistory: PetMedicalHistory;
  medicalHistorySubsicription: Subscription;

  medicalHistoryInfo: FormGroup | any;

  userId: string = '';
  petId: string = '';
  medicalHistoryId: string = '';
  edit: boolean = false;
  currentDate = new Date().toISOString();

  constructor(
    private actRoute: ActivatedRoute,
    private medicalHistoryService: MedicalHistoryService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const medicalHistoryId =
      this.actRoute.snapshot.paramMap.get('medicalHistoryId');
      
    this.userId = userId;
    this.petId = petId;
    this.medicalHistoryId = medicalHistoryId;

    this.edit = medicalHistoryId != null;

    this.medicalHistoryInfo = this.fb.group({
      medicalHistoryDate: ['', [Validators.required]],
      medicalHistory: ['', [Validators.required]],
      doctorsNote: ['', [Validators.required]],
    });
    
    if (this.edit) {
      this.getMedicalHistory();
    }
  }
  get medicalHistoryDate() {
    return this.medicalHistoryInfo.get('medicalHistoryDate');
  }

  get medicalHistory() {
    return this.medicalHistoryInfo.get('medicalHistory');
  }

  get doctorsNote() {
    return this.medicalHistoryInfo.get('doctorsNote');
  }

  async addMedicalHistory() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');

    const {
      doctorsNote,
      medicalHistory,
      medicalHistoryDate,
    }: PetMedicalHistory = this.medicalHistoryInfo.value;

    const loading = await this.loadingCtrl.create();

    const alert = await this.alertCtrl.create({
      header: 'Create Medical History?',
      message: 'Do you want to create this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            loading.present();

            this.medicalHistoryService
              .addMedicalHistory(userId, {
                doctorsNote,
                medicalHistory,
                medicalHistoryDate,
                petId,
              })
              .subscribe(
                async () => {
                  setTimeout(() => {
                    loading.dismiss();
                    this.medicalHistoryInfo.reset();
                    this.router.navigate([
                      '/owners-pet/' + userId + '/' + petId,
                    ]);
                  }, 1300);
                },
                async (error) => {
                  console.log('Error adding schedule:', error);
                  loading.dismiss();

                  const alert = this.alertCtrl.create({
                    header: "Can't Create Medical History!",
                    message: 'An error occured while making medical history.',
                    buttons: [
                      {
                        text: 'Ok',
                      },
                    ],
                    cssClass: 'custom-alert',
                  });
                  (await alert).present();
                }
              );
          },
        },
      ],
    });

    alert.present();
  }

  async updateMedicalHistory() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const medicalHistoryId = this.actRoute.snapshot.paramMap.get('medicalHistoryId');

    const {
      doctorsNote,
      medicalHistory,
      medicalHistoryDate,
    }: PetMedicalHistory = this.medicalHistoryInfo.value;

    const loading = await this.loadingCtrl.create();

    const alert = await this.alertCtrl.create({
      header: 'Create Medical History?',
      message: 'Do you want to create this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            loading.present();

            this.medicalHistoryService
              .addMedicalHistory(userId, {
                doctorsNote,
                medicalHistory,
                medicalHistoryDate,
                petId,
              })
              .subscribe(
                async () => {
                  setTimeout(() => {
                    loading.dismiss();
                    this.medicalHistoryInfo.reset();
                    this.router.navigate([
                      '/owners-pet/' + userId + '/' + petId,
                    ]);
                  }, 1300);
                },
                async (error) => {
                  console.log('Error adding schedule:', error);
                  loading.dismiss();

                  const alert = this.alertCtrl.create({
                    header: "Can't Create Medical History!",
                    message: 'An error occured while making medical history.',
                    buttons: [
                      {
                        text: 'Ok',
                      },
                    ],
                    cssClass: 'custom-alert',
                  });
                  (await alert).present();
                }
              );
          },
        },
      ],
    });

    alert.present();
  }

  async getMedicalHistory() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const medicalHistoryId = this.actRoute.snapshot.paramMap.get('medicalHistoryId');
    this.medicalHistoryService
      .getMedicalHistoryById(this.userId, medicalHistoryId)
      .subscribe((scheduleInfo:PetMedicalHistory) => {
        loading.dismiss();
        console.log(scheduleInfo.medicalHistory)
        this.currentDate = scheduleInfo.medicalHistoryDate.toDate().toISOString();
        this.medicalHistoryInfo = this.fb.group({
          medicalHistoryDate: [
            {value: scheduleInfo.medicalHistoryDate},
            [],
          ],
          medicalHistory: [
            scheduleInfo.medicalHistory,
            [],
          ],
          doctorsNote: [
            scheduleInfo.doctorsNote,
            [],
          ],
        });
      });
  }
}
