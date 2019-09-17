import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceViewReplenishmentComponent } from './replenishment.component';

describe('DeviceViewReplenishmentComponent', () => {
  let component: DeviceViewReplenishmentComponent;
  let fixture: ComponentFixture<DeviceViewReplenishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewReplenishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewReplenishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
