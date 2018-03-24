import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashmereComponent } from './cashmere.component';

describe('CashmereComponent', () => {
  let component: CashmereComponent;
  let fixture: ComponentFixture<CashmereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashmereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashmereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
