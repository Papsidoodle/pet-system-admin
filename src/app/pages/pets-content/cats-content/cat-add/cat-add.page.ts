import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
@Component({
  selector: 'app-cat-add',
  templateUrl: './cat-add.page.html',
  styleUrls: ['./cat-add.page.scss'],
})
export class CatAddPage implements OnInit {

  createCatInfoForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor( private modalController: ModalController,
    private catservice:CatsInfoService) { }

    dismissModal() {
      this.modalController.dismiss();
    }

  ngOnInit(): void {
    this.createCatInfoForm = new FormGroup({
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
    });
  }
  submitForm() {
    this.createForm.onSubmit(undefined);
  }

  createCatInfo(values: any) {
    // copy all the form values into the new CatInfo
    values.name = values.name.toLowerCase();
    let newCatInfo: CatInfo = { ...values };
    this.catservice.createCatInfo(newCatInfo);
    this.dismissModal();
  }

  onpetPhotosSelected(event: any) {
    const storage = getStorage();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `cat_photos/${file.name}`;
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
            this.createCatInfoForm.patchValue({ petphoto: downloadURL });
          });
        }
      );
    }
  }
}
