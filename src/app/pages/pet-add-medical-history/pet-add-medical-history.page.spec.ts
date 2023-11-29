import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetAddMedicalHistoryPage } from './pet-add-medical-history.page';

describe('PetAddMedicalHistoryPage', () => {
  let component: PetAddMedicalHistoryPage;
  let fixture: ComponentFixture<PetAddMedicalHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetAddMedicalHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
