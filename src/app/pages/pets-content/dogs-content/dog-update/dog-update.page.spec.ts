import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogUpdatePage } from './dog-update.page';

describe('DogUpdatePage', () => {
  let component: DogUpdatePage;
  let fixture: ComponentFixture<DogUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
