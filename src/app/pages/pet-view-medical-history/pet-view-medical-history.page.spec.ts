import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetViewMedicalHistoryPage } from './pet-view-medical-history.page';

describe('PetViewMedicalHistoryPage', () => {
  let component: PetViewMedicalHistoryPage;
  let fixture: ComponentFixture<PetViewMedicalHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PetViewMedicalHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
