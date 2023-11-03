import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogInfoPage } from './dog-info.page';

describe('DogInfoPage', () => {
  let component: DogInfoPage;
  let fixture: ComponentFixture<DogInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
