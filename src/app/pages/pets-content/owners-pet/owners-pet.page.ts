import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetMedicalHistory, PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';
import { MedicalHistoryService } from 'src/app/services/pet/medical-history/medical-history.service';

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
  '5in1 / 6in1 / 8in1',
];

@Component({
  selector: 'app-owners-pet',
  templateUrl: './owners-pet.page.html',
  styleUrls: ['./owners-pet.page.scss'],
})
export class OwnersPetPage implements OnInit {
  presentingElement: any;

  public user: User;
  userSub: Subscription;

  petinfo: PetsInfo;
  petInfo: Subscription;
  pet: PetsInfo[];
  pets: Subscription;
  petSub: Subscription;

  medicalHistories: PetMedicalHistory[];
  medHistorySub: Subscription; 

  // public petAppointments: PetsAppointment[];

  default = 'assets/palceholder.png';

  public apps: PetsAppointment[];
  public selectedAppointment: PetsAppointment;
  appointments: Subscription;
  public appointmentTypes = appointmentTypes;

  constructor(
    private userService: UsersService,
    private petsService: PetsInfoService,
    private scheduleService: ScheduleService,
    private medService: MedicalHistoryService,
    private actRoute: ActivatedRoute,
    private petService: PetsInfoService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toast: ToastController
  ) {}

  ngOnInit() {
    const uid = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');

    this.userSub = this.userService
      .getUsersInfoById(uid)
      .subscribe((userInfo) => {
        this.user = userInfo;
      });

    this.petInfo = this.petsService.getUserPet(uid).subscribe((pets: any) => {
      this.pet = pets;
    });

    this.appointments = this.scheduleService
      .getUnfinishedSchedulesByPetId(uid, petId)
      .subscribe((schedules: any) => {
        const formattedSchedule = schedules?.map((data) => {
          data.appointmentDate = formatDate(data.appointmentDate.toDate());
          return data;
        });
        console.log(formattedSchedule);
        this.apps = formattedSchedule;
      });

    this.medHistorySub = this.medService.getMedicalHistoryByPetId(uid,petId).subscribe((medicalHistory) => {
      medicalHistory.forEach((data) => {
        data.medicalHistoryDate = formatDate(data.medicalHistoryDate.toDate());
        this.medicalHistories = medicalHistory
      })
    })
    this.pets = this.petService.getPetInfo(uid, petId).subscribe((pet) => {
      this.pet = pet;
    });
  }

  goToAppointment(event: any) {
    const route = `schedule/${this.user.uid}/${this.pet[0].petId}/${event.target.value}`
    this.router.navigate([route]);
  }

  goToMedicalHistory(event:any) {
    const route = `/pet-view-medical-history/${this.user.uid}/${this.pet[0].petId}/${event.target.value}`
    this.router.navigate([route]);
  }

  async deletePet(userId: string[], petId: string) {
    const loading = this.loadingCtrl.create();

    const alert = this.alertCtrl.create({
      header: 'Delete Pet?',
      message: 'Are you sure you want to delete this pet?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
            (await loading).present();
            this.petService.deletePet(userId, petId).subscribe(
              async () => {
                (await loading).dismiss();
                this.router.navigate(['/user-info', userId]);
              },
              async (error) => {
                // Handle error
                (await loading).dismiss();
                console.error('Error updating pet info:', error);
              }
            );
            this.petService.deletePet(userId, petId);
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false,
    });

    (await alert).present();
  }

  async medHistory() {
    const toast = this.toast.create({
      header: 'Hello World',
      position: 'middle',
      duration: 1500
    });

    (await toast).present();
    // alert('Hello World!');
  }
}
