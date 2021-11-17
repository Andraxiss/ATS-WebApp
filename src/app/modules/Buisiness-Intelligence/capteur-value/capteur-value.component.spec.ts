import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteurValueComponent } from './capteur-value.component';

describe('CapteurValueComponent', () => {
  let component: CapteurValueComponent;
  let fixture: ComponentFixture<CapteurValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapteurValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapteurValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
