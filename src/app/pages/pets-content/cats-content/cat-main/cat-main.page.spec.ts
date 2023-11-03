import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatMainPage } from './cat-main.page';

describe('CatMainPage', () => {
  let component: CatMainPage;
  let fixture: ComponentFixture<CatMainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
