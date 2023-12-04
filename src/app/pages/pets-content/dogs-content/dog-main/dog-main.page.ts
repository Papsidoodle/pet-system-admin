import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogsInfoService } from 'dogs/dogs-info.service';
import { DogInfo } from 'dogs/dog';
@Component({
  selector: 'app-dog-main',
  templateUrl: './dog-main.page.html',
  styleUrls: ['./dog-main.page.scss'],
})
export class DogMainPage implements OnInit {
  public petInfo: DogInfo;

  sub1: Subscription;

  constructor(
    private dogservice: DogsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.dogservice.getDogInfotById(id).subscribe((petInfo) => {
      if (!petInfo) {
        this.router.navigate(['/dog-home']);
      } else {
        this.petInfo = petInfo;
      }
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
