import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogActivitiesPage } from './dog-activities.page';

describe('DogActivitiesPage', () => {
  let component: DogActivitiesPage;
  let fixture: ComponentFixture<DogActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
