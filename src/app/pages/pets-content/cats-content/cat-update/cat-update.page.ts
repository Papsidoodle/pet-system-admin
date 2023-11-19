import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  UploadTask
} from 'firebase/storage';
import { AnimationOptions } from 'ngx-lottie';
import { AlertController, LoadingController } from '@ionic/angular';
import Swiper from 'swiper';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { CatInfo } from 'src/app/services/pet/cats/cat';
@Component({
  selector: 'app-cat-update',
  templateUrl: './cat-update.page.html',
  styleUrls: ['./cat-update.page.scss'],
})
export class CatUpdatePage implements OnInit {

  public petInfo: CatInfo;
  updatepetInfoForm: FormGroup;
  formIsEdited: boolean = false;
  loading = false;  

  haircut:string[] = [];
  nail:string[] = [];
  ear:string[] = [];
  bath:string[] = [];
  puppic:string[]=[];
  adpic:string[]=[];
  senpic:string[]=[];

  sub1: Subscription;
  sub2: Subscription;

  @ViewChild('updateForm') updateForm: FormGroupDirective;
  uploadfileoption: AnimationOptions = {
    path: 'assets/json/catdance.json',
  };
  constructor(
    private petinfoservice: CatsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.petinfoservice.getCatInfotById(id)
    .subscribe(petInfo => {
      // if the petInfo doesn't exists, return to home page
      if (!petInfo) {
        this.router.navigate(['/cat-main']);
      } else {
        this.petInfo = petInfo;

        this.updatepetInfoForm = new FormGroup({
          name: new FormControl(this.petInfo.name),
          desc: new FormControl(this.petInfo.desc),
          orig: new FormControl(this.petInfo.origin),
          petphoto: new FormControl(this.petInfo.petphoto),
          origin: new FormControl(this.petInfo.origin),
          weight: new FormControl(this.petInfo.weight),
          height: new FormControl(this.petInfo.height),
          life: new FormControl(this.petInfo.life),
          temp: new FormControl(this.petInfo.temp),
          food: new FormControl(this.petInfo.food),
          med: new FormControl(this.petInfo.med),
          vac: new FormControl(this.petInfo.vac),
          haircut: new FormControl(this.petInfo.haircut),
          nail: new FormControl(this.petInfo.nail),
          ear: new FormControl(this.petInfo.ear),
          bath: new FormControl(this.petInfo.bath),
          pupstage:new FormControl(this.petInfo.pupstage),
          adstage:new FormControl(this.petInfo.adstage),
          senstage:new FormControl(this.petInfo.senstage),
          puppic:new FormControl(this.petInfo.puppic),
          adpic:new FormControl(this.petInfo.adpic),
          senpic:new FormControl(this.petInfo.senpic),
 
        });

        this.sub2 = this.updatepetInfoForm.valueChanges.subscribe(values => {
          this.formIsEdited = true;
        })
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
              this.router.navigate(['/cat-main', this.petInfo.id]);
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

    // convert the updated name to lowercase
    values.name = values.name.toLowerCase();
    // copy all the form values into the petInfo to be updated
    let updatedpetInfo: CatInfo = { id: this.petInfo.id, ...values };

    this.petinfoservice.updateCatInfo(updatedpetInfo);
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
              .deleteCatInfo(petInfoId)
              .then((res) => this.router.navigate(['/pets-info/']));
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
      const filePath = `cat_photos/${file.name}`;
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
  //selecting multiple haircut photos
  haircutselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `cathaircut_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.haircut.push(downloadURL); // Store the download URL in an array
            if (this.haircut.length === event.target.files.length) {
            this.updatepetInfoForm.patchValue({ haircut: this.haircut });
            }
          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }
  //selecting multiple nail photos
  nailselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `catnail_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.nail.push(downloadURL); // Store the download URL in an array
            if (this.nail.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ nail: this.nail });
              }
          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }

  //selecting multiple haircut photos
  earselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `cathaircut_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.ear.push(downloadURL); // Store the download URL in an array
            if (this.ear.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ ear: this.ear });
              }
          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }

  //selecting multiple haircut photos
  bathselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `cathaircut_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.bath.push(downloadURL); // Store the download URL in an array
            if (this.bath.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ bath: this.bath });
              }

          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }
  //selecting multiple puppy food photos
  pupselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `catfood_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.puppic.push(downloadURL); // Store the download URL in an array
            if (this.puppic.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ puppic: this.puppic });
              }

          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }
  //selecting multiple adult food photos
  adselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `catfood_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.adpic.push(downloadURL); // Store the download URL in an array
            if (this.adpic.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ adpic: this.adpic });
              }

          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }

   //selecting multiple adult food photos
   senselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];
  
    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `catfood_photos/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          // Handle upload error
          console.error('Upload error:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.senpic.push(downloadURL); // Store the download URL in an array
            if (this.senpic.length === event.target.files.length) {
              this.updatepetInfoForm.patchValue({ senpic: this.senpic });
              }

          });
        }
      );
  
      uploadTasks.push(uploadTask);
    }
  
    // Once all files are uploaded, you can do additional processing or validation
    Promise.all(uploadTasks.map((task) => task.then())).then(() => {
      console.log('All files uploaded successfully');
    });
  }
}
