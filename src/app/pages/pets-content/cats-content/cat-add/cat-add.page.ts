import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes, UploadTask } from "firebase/storage";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-cat-add',
  templateUrl: './cat-add.page.html',
  styleUrls: ['./cat-add.page.scss'],
})
export class CatAddPage implements OnInit {
  createCatInfoForm: FormGroup;
  haircut:string[] = [];
  nail:string[] = [];
  ear:string[] = [];
  bath:string[] = [];
  puppic:string[]=[];
  adpic:string[]=[];
  senpic:string[]=[];
  @ViewChild('createForm') createForm: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private catservice: CatsInfoService
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.createCatInfoForm = new FormGroup({
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
      const filePath = 'cat_photos/' + imgName;
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

            this.createCatInfoForm.patchValue({ petphoto: downloadURL });
          } catch (error) {
            console.log('Download url error: ', error);
          }
        });
    } catch (error) {
      console.log(error);
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
            this.createCatInfoForm.patchValue({ haircut: this.haircut });
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
              this.createCatInfoForm.patchValue({ nail: this.nail });
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
      const filePath = `catear_photos/${file.name}`;
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
              this.createCatInfoForm.patchValue({ ear: this.ear });
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
      const filePath = `catbath_photos/${file.name}`;
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
              this.createCatInfoForm.patchValue({ bath: this.bath });
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
              this.createCatInfoForm.patchValue({ puppic: this.puppic });
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
              this.createCatInfoForm.patchValue({ adpic: this.adpic });
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
              this.createCatInfoForm.patchValue({ senpic: this.senpic });
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
