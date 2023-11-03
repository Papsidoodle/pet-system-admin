import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatMedsPage } from './cat-meds.page';

describe('CatMedsPage', () => {
  let component: CatMedsPage;
  let fixture: ComponentFixture<CatMedsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatMedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
