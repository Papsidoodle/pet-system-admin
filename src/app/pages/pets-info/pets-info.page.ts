import { Component, OnInit } from '@angular/core';
import {
  IonRouterOutlet,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, Subscription, map, of } from 'rxjs';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { DogInfo } from 'dogs/dog';
import { DogsInfoService } from 'dogs/dogs-info.service';
import { CatAddPage } from '../pets-content/cats-content/cat-add/cat-add.page';
import { DogAddPage } from '../pets-content/dogs-content/dog-add/dog-add.page';

@Component({
  selector: 'app-pets-info',
  templateUrl: './pets-info.page.html',
  styleUrls: ['./pets-info.page.scss'],
})
export class PetsInfoPage implements OnInit {
  selectedSegment: string = '1';
  public search: string = '';
  public dogInfo: Observable<DogInfo[]>;
  public catInfo: Observable<CatInfo[]>;
  public searchdog: Observable<DogInfo[]>;
  public searchcat: Observable<CatInfo[]>;

  dogSubs: Subscription;

  result: string = '';

  constructor(
    private menuCtrl: MenuController,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private dogservice: DogsInfoService,
    private catservice: CatsInfoService
  ) {
    this.dogInfo = this.dogservice.getDogInfoAlphabetically();
    this.catInfo = this.catservice.getCatInfoAlphabetically();
  }

  openMenu() {
    this.menuCtrl.open('menu');
  }

  lottieoptionsdog: AnimationOptions = {
    path: 'assets/json/dog.json',
  };

  lottieoptionscat: AnimationOptions = {
    path: 'assets/json/cat.json',
  };

  segmentChanged() {
    // You can perform actions when the segment changes here if needed.
    // For example, fetch data based on the selected segment.
  }

  servicesSlide: any[] = [
    { title: 'Vaccination', img: '/assets/Services/vacc.jpg' },
    { title: 'Deworming', img: '/assets/Services/deworm.jpg' },
    { title: 'Consultation', img: '/assets/Services/consult.jpg' },
    { title: 'Confinement', img: '/assets/Services/confine.jpg' },
    { title: 'Surgeries', img: '/assets/Services/surg.jpg' },
    { title: 'Pet Boarding', img: '/assets/Services/board.jpg' },
    { title: 'Grooming', img: '/assets/Services/grooming.jpg' },
    { title: 'Home Services', img: '/assets/petbg2.jpg' },
    { title: 'Laboratory', img: '/assets/Services/lab.jpg' },
    { title: 'Direct Microscopy', img: '/assets/Services/micro.jpg' },
    { title: 'Ultrasound', img: '/assets/Services/ultrasound.jpg' },
    { title: 'Urine Analysis', img: '/assets/Services/urine.jpg' },
    { title: 'Complete Blood Chemistry', img: '/assets/Services/complete.jpg' },
  ];

  // search
  onDogSearch() {
    const searchlower = this.search.trim().toLowerCase();
    console.log('Search: ', searchlower);

    if (searchlower !== '') {
      this.searchdog = this.dogservice.searchDog(searchlower);
    } else {
      this.searchdog = null;
      this.search = '';
    }
  }

  handleDogSearch(event) {
    const query = event.target.value.toLowerCase();

    this.dogSubs = this.dogInfo.pipe(
      map((dogs) => 
        dogs.filter((dog) => {
          const dogName = 
            [...dog.name].join('').toLowerCase();

          return dogName.indexOf(query) > -1;
        })
      )
    ).subscribe(filteredDogs => {
      
      if (filteredDogs.length === 0) {
        this.result = 'No results found';
        console.log("No results found");
      } else {
        this.dogInfo = of(filteredDogs);
      }
    });

    if(!query) {
      this.dogInfo = this.dogservice.getDogInfoAlphabetically();
      this.result = '';
    }
  }

  handleCatSearch(event) {
    const query = event.target.value.toLowerCase();

    this.catInfo = this.catInfo.pipe(
      map((cats) => 
        cats.filter((cat) => {
          const catName = 
            [...cat.name].join('').toLowerCase();

          return catName.indexOf(query) > -1;
        })
      )
    );

    if (!query) {
      this.catInfo = this.catservice.getCatInfoAlphabetically();
    }
  }


  onCatSearch() {
    const searchlower = this.search.trim().toLowerCase();
    console.log('Search: ', searchlower);

    if (searchlower !== '') {
      this.searchcat = this.catservice.searchCat(searchlower);
    } else {
      this.searchcat = null;
      this.search = '';
    }
  }

  async openNewDogModal() {
    const modal = await this.modalController.create({
      component: DogAddPage,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async openNewCatModal() {
    const modal = await this.modalController.create({
      component: CatAddPage,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }
  ngOnInit() {}
}
