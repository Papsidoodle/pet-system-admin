import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { DogInfo } from 'src/app/services/pet/dogs/dog';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Subscription } from 'rxjs';
import { DogsInfoService } from 'src/app/services/pet/dogs/dogs-info.service';
@Component({
  selector: 'app-dog-add',
  templateUrl: './dog-add.page.html',
  styleUrls: ['./dog-add.page.scss'],
})
export class DogAddPage implements OnInit {

  createDogInfoForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;

  petphotoUrls: string[] = [];
  foodphotoUrls: string[] = [];
  sub1 = Subscription;
  constructor( private modalController: ModalController,
    private dogservice:DogsInfoService) { }

    dismissModal() {
      this.modalController.dismiss();
    }

  ngOnInit(): void {
    this.createDogInfoForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'desc': new FormControl('', Validators.required),
      'origin': new FormControl(''),
      'weight': new FormControl(''),
      'height': new FormControl(''),
      'life': new FormControl(''),
      'temp': new FormControl(''),
      'color': new FormControl(''),
      'food': new FormControl(''),
      'petphoto': new FormControl(''),
      'med': new FormControl(''),
      'haircut': new FormControl(''),
      'act': new FormControl(''),
      'vac': new FormControl(''),
      'common': new FormControl('')
    });
  }
  submitForm() {
    this.createForm.onSubmit(undefined);
  }

  createDogInfo(values: any) {
    values.name = values.name.toLowerCase();
    // copy all the form values into the new DogInfo
    let newDogInfo: DogInfo = { ...values };
    this.dogservice.createDogInfo(newDogInfo);
    this.dismissModal();
  }

  //pets
  onpetPhotosSelected(event: any) {
    const storage = getStorage();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `dog_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.createDogInfoForm.patchValue({ petphoto: downloadURL });
          });
        }
      );
    }
  }
  

  //file uplaod foods
  onfoodsPhotosSelected(event: any) {
    const storage = getStorage();
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const filePath = `dogfoods_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.foodphotoUrls.push(downloadURL);
            console.log(this.foodphotoUrls); // Log the array to check if URLs are correctly added
            if (this.foodphotoUrls.length === event.target.files.length) {
              this.createDogInfoForm.patchValue({ foodphoto: this.foodphotoUrls });
            }
          });
        }
      );
    }
  }
  
}
