import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

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

  // public petAppointments: PetsAppointment[];

  default = 'assets/palceholder.png';

  public apps: PetsAppointment[];  
  appointments: Subscription;

  constructor(
    private userService: UsersService,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private petService: PetsInfoService,
    private router: Router, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private sched: ScheduleService
    ) { }

  ngOnInit() {
    const uid = this.actRoute.snapshot.paramMap.get('uid')
    const petId = this.actRoute.snapshot.paramMap.get('petId');

    (this.userSub = this.userService
      .getUsersInfoById(uid)
      .subscribe((userInfo) => {
        this.user = userInfo;
      })),
      (this.petInfo = this.petsService
        .getUserPet(uid)
        .subscribe((pets: any) => {
          this.pet = pets;
        }))

    this.pets = this.petService.getPetInfo(uid, petId).subscribe((pet) => {
      this.pet = pet;
      console.log(pet);
    });
  }

  async deletePet(userId:string[], petId:string) {
    const loading = this.loadingCtrl.create();

    const alert = this.alertCtrl.create({
      header: 'Delete Pet?',
      message: 'Are you sure you want to delete this pet?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
            (await loading).present();
            this.petService.deletePet(userId, petId).subscribe(async () => {
              (await loading).dismiss();
              this.router.navigate(['/user-info', userId]);
            },
            async (error) => {
              // Handle error
              (await loading).dismiss();
              console.error('Error updating pet info:', error);
            }
          );
          this.petService.deletePet(userId,petId);
          }
        }
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    (await alert).present();
  }

}
