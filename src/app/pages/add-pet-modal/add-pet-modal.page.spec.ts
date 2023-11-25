import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPetModalPage } from './add-pet-modal.page';

describe('AddPetModalPage', () => {
  let component: AddPetModalPage;
  let fixture: ComponentFixture<AddPetModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPetModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
