import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatActivitiesPage } from './cat-activities.page';

describe('CatActivitiesPage', () => {
  let component: CatActivitiesPage;
  let fixture: ComponentFixture<CatActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
