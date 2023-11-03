import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogFoodsPage } from './dog-foods.page';

describe('DogFoodsPage', () => {
  let component: DogFoodsPage;
  let fixture: ComponentFixture<DogFoodsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
