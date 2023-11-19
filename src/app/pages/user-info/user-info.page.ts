import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsInfo } from 'src/app/models/pets';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  public user: User;
  public pet: PetsInfo;

  userSub: Subscription;
  petSub: Subscription;

  constructor(
    private userService: UsersService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const uid = this.actRoute.snapshot.paramMap.get('uid');
    (this.userSub = this.userService
      .getUsersInfoById(uid)
      .subscribe((userInfo) => {
        if (!userInfo) {
          this.router.navigate(['/homescreen']);
        } else {
          this.user = userInfo;
        }
      })),
      (this.petSub = this.userService
        .getUsersPetById(uid)
        .subscribe((petInfo) => {
          console.log(petInfo);
          this.pet = petInfo  ;
        }));
  }

  async addPetInfo() {}
}
