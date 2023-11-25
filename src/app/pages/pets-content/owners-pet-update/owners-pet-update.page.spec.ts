import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnersPetUpdatePage } from './owners-pet-update.page';

describe('OwnersPetUpdatePage', () => {
  let component: OwnersPetUpdatePage;
  let fixture: ComponentFixture<OwnersPetUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OwnersPetUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
