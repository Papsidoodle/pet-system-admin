import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { PetsInfoService } from 'src/app/services/pet/pets/pets-info.service';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-owners-pet-update',
  templateUrl: './owners-pet-update.page.html',
  styleUrls: ['./owners-pet-update.page.scss'],
})
export class OwnersPetUpdatePage implements OnInit, OnDestroy {
  @ViewChild('updateForm') updateForm: FormGroupDirective;

  public user: User;
  petdata: PetsInfo;
  userId: string = '';
  petSub: Subscription;
  userSub: Subscription;
  presentingElement: any;
  sub2: Subscription;

  updatepetInfoForm: FormGroup;
  formIsEdited: boolean = false;

  constructor(
    private userService: UsersService,
    private petsService: PetsInfoService,
    private actRoute: ActivatedRoute,
    private petService: PetsInfoService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router
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

      const uploadTask = uploadBytes(storageRef, blob)


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

          this.updatepetInfoForm.patchValue({petImg : downloadURL});
        } catch (error) {
          console.log('Download url error: ',error)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    const uid = this.actRoute.snapshot.paramMap.get('uid');
    this.userId = this.actRoute.snapshot.paramMap.get('uid');
    const selectPetId = this.actRoute.snapshot.paramMap.get('petId'); // Assuming 'petName' is the parameter

    this.userSub = this.userService.getUsersInfoById(uid).subscribe((userInfo) => {
      this.user = userInfo;

      this.petSub = this.petsService.getUserPet(uid).subscribe((pets: PetsInfo[]) => {
        console.log(pets);
        this.petdata = pets.find((pet) => pet.petId === selectPetId);

        if (this.petdata) {
          this.updatepetInfoForm = this.fb.group({
            petName: new FormControl(this.petdata.petName),
            age: new FormControl(this.petdata.age),
            birthday: new FormControl(this.petdata.birthday),
            height: new FormControl(this.petdata.height),
            weight: new FormControl(this.petdata.weight),
            kind: new FormControl(this.petdata.kind),
            breed: new FormControl(this.petdata.breed),
            color: new FormControl(this.petdata.color),
            gender: new FormControl(this.petdata.gender),
            chipNo: new FormControl(this.petdata.chipNo),
            petImg: new FormControl(this.petdata.petImg),
          });

          this.sub2 = this.updatepetInfoForm.valueChanges.subscribe((values) => {
            this.formIsEdited = true;
          });
        }
      });
    });
  }

  async updatepetInfo(values: any) {
    let updatedPetInfo: PetsInfo = { petId: this.petdata.petId, ...values };

    const loading = this.loadingCtrl.create();

    (await loading).present();
    
    this.petService.updatePetInfo(this.userId, updatedPetInfo).subscribe(async () => {

      setTimeout(async() => {
        (await loading).dismiss();
        console.log(this.petdata);
        this.router.navigate(['/owners-pet', this.user.uid, this.petdata.petId]);
      }, 1300);
    },
    async (error) => {
      // Handle error
      (await loading).dismiss();
      console.error('Error updating pet info:', error);
      }
    );
  }
    

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.petSub.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  submit() {
    this.updateForm.onSubmit(undefined);
  }
}
