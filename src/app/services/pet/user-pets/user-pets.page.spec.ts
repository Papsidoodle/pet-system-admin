import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPetsPage } from './user-pets.page';

describe('UserPetsPage', () => {
  let component: UserPetsPage;
  let fixture: ComponentFixture<UserPetsPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(UserPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
