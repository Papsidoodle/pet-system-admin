import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogAddPage } from './dog-add.page';

describe('DogAddPage', () => {
  let component: DogAddPage;
  let fixture: ComponentFixture<DogAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DogAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
