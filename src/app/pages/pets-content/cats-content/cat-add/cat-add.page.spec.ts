import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatAddPage } from './cat-add.page';

describe('CatAddPage', () => {
  let component: CatAddPage;
  let fixture: ComponentFixture<CatAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
