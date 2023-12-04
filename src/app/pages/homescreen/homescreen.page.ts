import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Observable, Subscription, map } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { ScheduleService } from 'src/app/services/pet/schedule/schedule.service';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';

export interface imgInterface {
  img: string;
  imgId: string;
}

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  // users$: Observable<User[] | any>;

  public user: Observable<User[]>;

  public pictureFG: FormGroup | any;
  public pictures: imgInterface[];
  public pictureSubscription: Subscription;

  public img: string = '';
  default = 'assets/palceholder.png';

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.user = this.userService.getUsersInfo();

    this.pictureFG = this.fb.group({
      img: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.pictureSubscription = this.scheduleService
      .getAnnoucements()
      .subscribe((annoucements) => {
        console.log(annoucements);
        this.pictures = annoucements;
        this.pictures.push({ img: '/assets/Services/service1.png', imgId: '1' });
        this.pictures.push({ img: '/assets/Services/service1.png', imgId: '2' });
        const images = this.pictures.map((picture) => {
          return { img: picture.img };
        });
      });
  }

  async addAnnoucement() {
    console.log('test');
    const imgName = new Date().getTime() + '.jpg';

    // storage for the image
    const filePath = 'announcement/' + imgName;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytes(storageRef, this.pictureFG.value.img);

    const loading = await this.loadingCtrl.create();

    const alert = await this.alertCtrl.create({
      header: 'Create Annoucement?',
      message: 'Do you want to create this annoucement?',
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
            uploadTask
              .then(async () => {
                try {
                  const downloadURL = await getDownloadURL(storageRef);

                  this.scheduleService.createPicture(downloadURL).subscribe(
                    async () => {
                      setTimeout(() => {
                        loading.dismiss();
                        this.pictureFG.reset();
                        this.router.navigate(['/']);
                        this.closeModal();
                      }, 1300);
                    },
                    async (error) => {
                      console.log('Error adding schedule:', error);
                      loading.dismiss();

                      const alert = this.alertCtrl.create({
                        header: "Can't Create Annoucement!",
                        message: 'An error occured while making annoucement.',
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
                } catch (error) {
                  console.log('Download url error: ', error);
                }
              })
              .catch((error) => {
                console.log('Image upload error: ', error);
              });
          },
        },
      ],
    });
    (await alert).present();
  }

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

      const response = await fetch(image.dataUrl);
      const blob = await response.blob();

      this.img = URL.createObjectURL(blob);
      this.pictureFG.patchValue({ img: blob });
    } catch (error) {
      console.log(error);
    }
  }
  closeModal() {
    this.pictureFG.reset();
    return this.modal.dismiss(null, 'cancel');
  }
  
  async deleteAnnoucement(id:string) {
    console.log(id);
    const alert = await this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to delete the picture?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.scheduleService.deleteAnnouncment(id).then((res) => this.router.navigate(['/']));
          },
        },
      ],
    });

    await alert.present();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();

    this.user = this.user.pipe(
      map((users) =>
        users.filter((user) => {
          const fullName =
            [...user.firstname].join('').toLowerCase() +
            [...user.middlename].join('').toLowerCase() +
            [...user.lastname].join('').toLowerCase();
          return fullName.indexOf(query) > -1;
        })
      )
    );

    if (!query) {
      this.user = this.userService.getUsersInfo();
    }
  }
}
