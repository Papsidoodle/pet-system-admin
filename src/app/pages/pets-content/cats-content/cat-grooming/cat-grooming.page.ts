import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatsInfoService } from 'src/app/services/pet/cats/cats-info.service';
import { CatInfo } from 'src/app/services/pet/cats/cat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cat-grooming',
  templateUrl: './cat-grooming.page.html',
  styleUrls: ['./cat-grooming.page.scss'],
})
export class CatGroomingPage implements OnInit {

  public petInfo: CatInfo;
  sub1: Subscription;

  constructor(
    private catservice:CatsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.catservice.getCatInfotById(id)
    .subscribe(petInfo => {
      if (!petInfo) {
        this.router.navigate(['/cat-main']);
      } else {
        this.petInfo = petInfo;
      }
    });
  }

}
