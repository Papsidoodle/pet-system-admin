import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetsAppointment } from 'src/app/models/pets-appointment';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Firestore } from '@angular/fire/firestore';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  public user: User;
  public pet: PetsInfo[];
  public petAppointments: PetsAppointment[];

  petsInfo: FormGroup | any;

  userSub: Subscription;
  petSub: Subscription;
  petAppointmentsSub: Subscription;
  petInfo: Subscription;

  userId: string = '';

  presentingElement: any;

  default = 'assets/palceholder.png'

  constructor(
    private userService: UsersService,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    private fb : FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private firestore: Firestore
  ) {}

  // camera function
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        saveToGallery: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        correctOrientation: true
      });

      const imgName = new Date().getTime() + '.jpg';

      // // storage for the image 
      const filePath = 'pet_photo/' + imgName;
      const storage = getStorage();
      const storageRef = ref(storage, filePath)


      const response = await fetch(image.dataUrl)
      const blob = await response.blob();

      const uploadTask = uploadBytes(storageRef,blob)


      uploadTask
      .then((snapshot) =>{
        //image upload success
      })
      .catch((error)=>{
        console.log('Image upload error: ', error)
      })
      .then(async () =>{
        try {
          
          const downloadURL = await getDownloadURL(storageRef);

          this.petsInfo.patchValue({petImg : downloadURL});
        } catch (error) {
          console.log('Download url error: ',error)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  get petName() {
    return this.petsInfo.get('petName');
  }

  get age() {
    return this.petsInfo.get('age');
  }

  get birthday() {
    return this.petsInfo.get('birthday');
  }

  get height() {
    return this.petsInfo.get('height');
  }

  get weight() {
    return this.petsInfo.get('weight');
  }

  get kind() {
    return this.petsInfo.get('kind');
  }

  get breed() {
    return this.petsInfo.get('breed');
  }

  get color() {
    return this.petsInfo.get('color');
  }

  get gender() {
    return this.petsInfo.get('gender');
  }

  get chipNo() {
    return this.petsInfo.get('chipNo');
  }

  get petImg() {
    return this.petsInfo.get('petImg');
  }

  closeModal() {
    return this.modal.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.modal-handle');

    const uid = this.actRoute.snapshot.paramMap.get('uid');

    this.userId = this.actRoute.snapshot.paramMap.get('uid');

    (this.userSub = this.userService
      .getUsersInfoById(uid)
      .subscribe((userInfo) => {
        this.user = userInfo;
      })),
      (this.petInfo = this.petsService
        .getUserPet(uid)
        .subscribe((pets: any) => {
          console.log(pets);
          this.pet = pets;
        }))

        this.petsInfo = this.fb.group({
          petName: ['', [Validators.required]],
          age: ['', [Validators.required]],
          birthday:['', [Validators.required]],
          height:['', [Validators.required]],
          weight:['', [Validators.required]],
          kind: ['', [Validators.required]],
          breed:['', [Validators.required]],
          color:['', [Validators.required]],
          gender: ['', [Validators.required]],
          chipNo: ['', [Validators.required]],
          petImg: ['']
        })
  }
  
  // add owner's pet
  async addPet() {
    const petId = this.userId;
    const petInfo = this.petsInfo.value;

    const loading = this.loadingCtrl.create();

    (await loading).present();

    this.petsService.addPetInfo(petId, petInfo).subscribe(async () => {
      console.log('Success');
      setTimeout(async () => {
        (await loading).dismiss();
        this.petsInfo.reset();
        this.modal.dismiss();
      }, 1400);

    }, async error => {
      console.log('Error adding pet information:', error);
      (await loading).dismiss();

      const alert = this.alertCtrl.create({
        header: "Can't Add Pet Info!",
        message: 'An error occured while adding pet information.',
        buttons: [
          {
            text: 'Ok'
          }
        ],
        cssClass: 'custom-alert'
      });
      (await alert).present();
    });
  }
}
