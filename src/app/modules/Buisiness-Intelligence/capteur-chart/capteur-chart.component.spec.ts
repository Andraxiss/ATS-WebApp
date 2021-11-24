import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteurChartComponent } from './capteur-chart.component';

describe('CapteurChartComponent', () => {
  let component: CapteurChartComponent;
  let fixture: ComponentFixture<CapteurChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapteurChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapteurChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
