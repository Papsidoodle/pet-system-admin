import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogMainPage } from './dog-main.page';

describe('DogMainPage', () => {
  let component: DogMainPage;
  let fixture: ComponentFixture<DogMainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
