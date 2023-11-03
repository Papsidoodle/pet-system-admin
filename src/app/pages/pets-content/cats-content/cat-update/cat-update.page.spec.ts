import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatUpdatePage } from './cat-update.page';

describe('CatUpdatePage', () => {
  let component: CatUpdatePage;
  let fixture: ComponentFixture<CatUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
