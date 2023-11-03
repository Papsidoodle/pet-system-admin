import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogGroomingPage } from './dog-grooming.page';

describe('DogGroomingPage', () => {
  let component: DogGroomingPage;
  let fixture: ComponentFixture<DogGroomingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogGroomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
