import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, LoadingController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  schedules: PetsAppointment[];
  schedule: PetsAppointment;
  schedulesSubscription: Subscription;

  appointmentInfo: FormGroup | any;

  userId: string = '';
  petId: string = '';
  edit: boolean = false;
  currentDate = new Date().toISOString();
  appointmentTy:number;

  constructor(
    private actRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  get weight() {
    return this.appointmentInfo.get('weight');
  }

  get vetName() {
    return this.appointmentInfo.get('vetName');
  }

  get appointmentDate() {
    return this.appointmentInfo.get('appointmentDate');
  }

  get appointmentType() {
    return this.appointmentInfo.get('appType');
  }

  get brandImg() {
    return this.appointmentInfo.get('brandImg');
  }

  // camera function
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        saveToGallery: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        correctOrientation: true,
      });

      const imgName = new Date().getTime() + '.jpg';

      // // storage for the image
      const filePath = 'pet_photo/' + imgName;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);

      const response = await fetch(image.dataUrl);
      const blob = await response.blob();

      const uploadTask = uploadBytes(storageRef, blob);

      uploadTask
        .then((snapshot) => {
          //image upload success
        })
        .catch((error) => {
          console.log('Image upload error: ', error);
        })
        .then(async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);

            this.appointmentInfo.patchValue({ brandImg: downloadURL });
          } catch (error) {
            console.log('Download url error: ', error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const appointmentId = this.actRoute.snapshot.paramMap.get('appointmentId');

    this.userId = userId;
    this.petId = petId;
    this.edit = appointmentId != null;

    this.appointmentInfo = this.fb.group({
      appointmentType: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      vetName: ['', []],
      weight: ['', []],
      brandImg: ['', []],
    });
    if (this.edit) {
      this.getSchedules();
    }
  }
  async getSchedules() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const appointmentId = this.actRoute.snapshot.paramMap.get('appointmentId');
    this.scheduleService
      .getSchedulesByAppId(this.userId, appointmentId)
      .subscribe((scheduleInfo) => {
        loading.dismiss();
        this.currentDate = scheduleInfo.appointmentDate.toDate().toISOString();
        this.appointmentTy = scheduleInfo.appointmentType;
        this.appointmentInfo = this.fb.group({
          appointmentType: [
            {value: scheduleInfo.appointmentType,disabled: true},
            [],
          ],
          appointmentDate: [
            {value: scheduleInfo.appointmentDate,disabled: true},
            [],
          ],
          vetName: [scheduleInfo?.vetName ?? '', [Validators.required]],
          weight: [scheduleInfo?.weight ?? '', [Validators.required]],
          brandImg: [scheduleInfo?.brandImg ?? '', [Validators.required]],
        });
      });
  }

  async updateSchedule() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const appointmentId = this.actRoute.snapshot.paramMap.get('appointmentId');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const { appointmentType, appointmentDate, vetName, weight, brandImg } =
      this.appointmentInfo.value;
    const loading = await this.loadingCtrl.create();
    const alert = await this.alertCtrl.create({
      header: 'Update Appointment?',
      message: 'Do you want to update this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
            alert.dismiss();
            loading.present();

            await this.scheduleService.updateScheduleInfo(
              userId,
              appointmentId,
              {
                appointmentType:this.appointmentTy,
                appointmentDate:new Date(this.currentDate),
                vetName,
                weight,
                brandImg,
                petId,
                appointmentId,
              }
            );
            setTimeout(() => {
              loading.dismiss();
              this.appointmentInfo.reset();
              this.router.navigate(['/owners-pet/' + userId + '/' + petId]);
            }, 1300);
          },
        },
      ],
    });

    alert.present();
  }

  async addSchedule() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');

    const { appointmentType, appointmentDate, vetName, weight, brandImg } =
      this.appointmentInfo.value;

    const loading = await this.loadingCtrl.create();

    const alert = await this.alertCtrl.create({
      header: 'Create Appointment?',
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

            this.scheduleService
              .addSchedule(userId, {
                appointmentType,
                appointmentDate,
                vetName,
                weight,
                brandImg,
                petId,
              })
              .subscribe(
                async () => {
                  setTimeout(() => {
                    loading.dismiss();
                    this.appointmentInfo.reset();
                    this.router.navigate([
                      '/owners-pet/' + userId + '/' + petId,
                    ]);
                  }, 1300);
                },
                async (error) => {
                  console.log('Error adding schedule:', error);
                  loading.dismiss();

                  const alert = this.alertCtrl.create({
                    header: "Can't Create Appointment!",
                    message: 'An error occured while making appointment.',
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
}
