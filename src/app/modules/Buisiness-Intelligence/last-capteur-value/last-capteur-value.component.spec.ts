import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LastCapteurValueComponent } from "./last-capteur-value.component";

describe("LastCapteurValueComponent", () => {
  let component: LastCapteurValueComponent;
  let fixture: ComponentFixture<LastCapteurValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastCapteurValueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCapteurValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
