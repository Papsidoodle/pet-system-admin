import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  FormArray,
} from '@angular/forms';
import { DogInfo } from 'dogs/dog';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  UploadTask,
} from 'firebase/storage';
import { Subscription } from 'rxjs';
import { DogsInfoService } from 'dogs/dogs-info.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-dog-add',
  templateUrl: './dog-add.page.html',
  styleUrls: ['./dog-add.page.scss'],
})
export class DogAddPage implements OnInit {
  createDogInfoForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;

  petphoto: string[] = [];
  haircut: string[] = [];
  nail: string[] = [];
  ear: string[] = [];
  bath: string[] = [];
  puppic: string[] = [];
  adpic: string[] = [];
  senpic: string[] = [];
  sub1 = Subscription;
  constructor(
    private modalController: ModalController,
    private dogservice: DogsInfoService
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.createDogInfoForm = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      origin: new FormControl(''),
      weight: new FormControl(''),
      height: new FormControl(''),
      life: new FormControl(''),
      temp: new FormControl(''),
      color: new FormControl(''),
      food: new FormControl(''),
      petphoto: new FormControl(''),
      med: new FormControl(''),
      act: new FormControl(''),
      vac: new FormControl(''),
      common: new FormControl(''),
      haircut: new FormControl([]),
      nail: new FormControl([]),
      ear: new FormControl([]),
      bath: new FormControl([]),
      pupstage: new FormControl(''),
      adstage: new FormControl(''),
      senstage: new FormControl(''),
      puppic: new FormControl([]),
      adpic: new FormControl([]),
      senpic: new FormControl([]),
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

  //selecting multiple haircut photos
  haircutselect(event: any) {
    const storage = getStorage();
    const files: FileList = event.target.files;
    const uploadTasks: UploadTask[] = [];

    // Loop through the selected files and upload them individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `doghaircut_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ haircut: this.haircut });
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
      const filePath = `dognail_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ nail: this.nail });
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
      const filePath = `doghaircut_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ ear: this.ear });
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
      const filePath = `doghaircut_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ bath: this.bath });
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
      const filePath = `dogfood_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ puppic: this.puppic });
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
      const filePath = `dogfood_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ adpic: this.adpic });
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
      const filePath = `dogfood_photos/${file.name}`;
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
              this.createDogInfoForm.patchValue({ senpic: this.senpic });
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

      // storage for the image
      const filePath = 'dog_photos/' + imgName;
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

            this.createDogInfoForm.patchValue({ petphoto: downloadURL });
          } catch (error) {
            console.log('Download url error: ', error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
