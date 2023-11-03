import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatInfoPage } from './cat-info.page';

describe('CatInfoPage', () => {
  let component: CatInfoPage;
  let fixture: ComponentFixture<CatInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
