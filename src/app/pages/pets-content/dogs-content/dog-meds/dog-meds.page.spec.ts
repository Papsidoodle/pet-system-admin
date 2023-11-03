import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogMedsPage } from './dog-meds.page';

describe('DogMedsPage', () => {
  let component: DogMedsPage;
  let fixture: ComponentFixture<DogMedsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogMedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
