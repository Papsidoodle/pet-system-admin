import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogsInfoService } from 'src/app/services/pet/dogs/dogs-info.service';
import { DogInfo } from 'src/app/services/pet/dogs/dog';

@Component({
  selector: 'app-dog-activities',
  templateUrl: './dog-activities.page.html',
  styleUrls: ['./dog-activities.page.scss'],
})
export class DogActivitiesPage implements OnInit {

  public petInfo: DogInfo;
  sub1: Subscription;

  constructor(
    private dogservice:DogsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.dogservice.getDogInfotById(id)
    .subscribe(petInfo => {
      if (!petInfo) {
        this.router.navigate(['/dog-main']);
      } else {
        this.petInfo = petInfo;
      }
    });
  }

}
