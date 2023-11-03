import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatFoodsPage } from './cat-foods.page';

describe('CatFoodsPage', () => {
  let component: CatFoodsPage;
  let fixture: ComponentFixture<CatFoodsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
