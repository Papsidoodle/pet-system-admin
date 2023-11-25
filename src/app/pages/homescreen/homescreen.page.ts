import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/user/users';
import { UsersService } from 'src/app/services/user/users.service';
@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {
  // users$: Observable<User[] | any>;

  public user: Observable<User[]>;

  constructor(private userService: UsersService) {
    this.user = this.userService.getUsersInfo();
  }

  servicesSlide: any[] = [
    { img: '/assets/Services/service1.png' },
    { img: '/assets/Services/service2.png' },
  ];

  ngOnInit() {}
}
