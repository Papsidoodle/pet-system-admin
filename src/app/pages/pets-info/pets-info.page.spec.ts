import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetsInfoPage } from './pets-info.page';

describe('PetsInfoPage', () => {
  let component: PetsInfoPage;
  let fixture: ComponentFixture<PetsInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
