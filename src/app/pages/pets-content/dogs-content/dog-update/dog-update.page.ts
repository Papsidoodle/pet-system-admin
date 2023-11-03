import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DogsInfoService } from 'src/app/services/pet/dogs/dogs-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DogInfo } from 'src/app/services/pet/dogs/dog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Subscription, finalize, switchMap } from 'rxjs';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { AnimationOptions } from 'ngx-lottie';
import { AlertController, LoadingController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-dog-update',
  templateUrl: './dog-update.page.html',
  styleUrls: ['./dog-update.page.scss'],
})
export class DogUpdatePage implements OnInit {
  public petInfo: DogInfo;
  updatepetInfoForm: FormGroup;
  formIsEdited: boolean = false;
  loading = false;
  sub1: Subscription;
  sub2: Subscription;

  @ViewChild('updateForm') updateForm: FormGroupDirective;

  uploadfileoption: AnimationOptions = {
    path: 'assets/json/dogdance.json',
  };

  constructor(
    private petinfoservice: DogsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.petinfoservice.getDogInfotById(id).subscribe((petInfo) => {
      // if the petInfo doesn't exists, return to home page
      if (!petInfo) {
        this.router.navigate(['/dog-home']);
      } else {
        this.petInfo = petInfo;

        this.updatepetInfoForm = new FormGroup({
          name: new FormControl(this.petInfo.name),
          desc: new FormControl(this.petInfo.desc),
          petphoto: new FormControl(this.petInfo.petphoto),
          origin: new FormControl(this.petInfo.origin),
          weight: new FormControl(this.petInfo.weight),
          height: new FormControl(this.petInfo.height),
          life: new FormControl(this.petInfo.life),
          temp: new FormControl(this.petInfo.temp),
          food: new FormControl(this.petInfo.food),
          med: new FormControl(this.petInfo.med),
          haircut: new FormControl(this.petInfo.haircut),
          act: new FormControl(this.petInfo.act),
          vac: new FormControl(this.petInfo.vac),
        });

        this.sub2 = this.updatepetInfoForm.valueChanges.subscribe((values) => {
          this.formIsEdited = true;
        });
      }
    });
  }

  async submitForm() {
    const alert = await this.alertController.create({
      header: 'Confirm Update',
      message: 'Are you sure you want to update this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // clicked the "Cancel" button, do nothing
          },
        },
        {
          text: 'Update',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Updating...',
            });

            await loading.present();

            try {
              this.updateForm.onSubmit(undefined);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await loading.dismiss();
              this.router.navigate(['/dog-main', this.petInfo.id]);
            } catch (error) {
              console.error('Update failed:', error);
              await loading.dismiss();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  updatepetInfo(values: any) {
    values.name = values.name.toLowerCase();
    // copy all the form values into the petInfo to be updated
    let updatedpetInfo: DogInfo = { id: this.petInfo.id, ...values };
    this.petinfoservice.updateDogInfo(updatedpetInfo);
  }

  async deletepetInfo(petInfoId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User clicked the "Cancel" button, do nothing
          },
        },
        {
          text: 'Delete',
          handler: () => {
            // User clicked the "Delete" button, proceed with deletion
            this.petinfoservice
              .deleteDogInfo(petInfoId)
              .then((res) => this.router.navigate(['/homescreen/']));
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  onPhotoSelected(event: any) {
    const storage = getStorage();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `dog_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Set loading to true when starting the upload
      this.loading = true;

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
          // You can log the progress in the console if needed
        },
        (error) => {
          // Handle upload error
          console.error('Upload Error:', error);
          this.loading = false; // Set loading to false on error
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.updatepetInfoForm.patchValue({ petphoto: downloadURL });
            this.loading = false;
          });
        }
      );
    }
  }
}
