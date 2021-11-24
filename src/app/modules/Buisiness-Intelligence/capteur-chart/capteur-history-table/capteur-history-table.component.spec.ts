import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CapteurHistoryTableComponent } from "./capteur-history-table.component";

describe("CapteurHistoryTableComponent", () => {
  let component: CapteurHistoryTableComponent;
  let fixture: ComponentFixture<CapteurHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapteurHistoryTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapteurHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
