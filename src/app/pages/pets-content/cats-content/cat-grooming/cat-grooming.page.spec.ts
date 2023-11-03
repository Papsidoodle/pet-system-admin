import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatGroomingPage } from './cat-grooming.page';

describe('CatGroomingPage', () => {
  let component: CatGroomingPage;
  let fixture: ComponentFixture<CatGroomingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatGroomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
