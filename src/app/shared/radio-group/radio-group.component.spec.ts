import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group.component';
import { NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';

class MockNgControl extends NgControl {
  control = {
    value: null,
    setErrors: jasmine.createSpy('setErrors'),
    hasValidator: (validator: any) => false,
  } as any;
  override valueAccessor: any = null;
  viewToModelUpdate = jasmine.createSpy('viewToModelUpdate');
}

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;
  let mockNgControl: MockNgControl;

  beforeEach(async () => {
    mockNgControl = new MockNgControl();

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RadioGroupComponent],
      providers: [
        {
          provide: NgControl,
          useValue: mockNgControl,
        },
      ],
    }).compileComponents();



    fixture = TestBed.createComponent(RadioGroupComponent);

    console.log('mock control is not null')
    component = fixture.componentInstance;
    mockNgControl.valueAccessor = component;
    signalSetFn(component.title[SIGNAL], 'test');
    signalSetFn(component.options[SIGNAL], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
