import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHero } from './main-hero';

describe('MainHero', () => {
  let component: MainHero;
  let fixture: ComponentFixture<MainHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHero],
    }).compileComponents();

    fixture = TestBed.createComponent(MainHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
