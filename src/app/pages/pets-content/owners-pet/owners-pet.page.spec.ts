import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnersPetPage } from './owners-pet.page';

describe('OwnersPetPage', () => {
  let component: OwnersPetPage;
  let fixture: ComponentFixture<OwnersPetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OwnersPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
