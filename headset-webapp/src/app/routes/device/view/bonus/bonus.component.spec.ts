import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceViewBonusComponent } from './bonus.component';

describe('DeviceViewBonusComponent', () => {
  let component: DeviceViewBonusComponent;
  let fixture: ComponentFixture<DeviceViewBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
