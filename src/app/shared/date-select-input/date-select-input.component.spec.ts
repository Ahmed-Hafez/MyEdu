import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateSelectInputComponent } from './date-select-input.component';
import { NgControl } from '@angular/forms';

class MockNgControl extends NgControl {
  control = {
    value: null,
    setErrors: jasmine.createSpy('setErrors'),
    hasValidator: (validator: any) => false,
  } as any;

  viewToModelUpdate = jasmine.createSpy('viewToModelUpdate');
}

describe('DateSelectInputComponent', () => {
  let component: DateSelectInputComponent;
  let fixture: ComponentFixture<DateSelectInputComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DateSelectInputComponent],
      providers: [
        FormBuilder,
        {
          provide: NgControl,
          useClass: MockNgControl,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateSelectInputComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.inject(FormBuilder);
    formGroup = formBuilder.group({
      dateInput: [''],
    });

    const ngControl = TestBed.inject(NgControl) as MockNgControl;
    ngControl.control = formGroup.get('dateInput') as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dates and months', () => {
    expect(component.dates.length).toBe(31);
    expect(component.months.length).toBe(12);
    expect(component.months[0].name).toBe('January');
  });

  it('should write a valid value and update selected date, month, and year', () => {
    const value = '15-02-2023';
    component.writeValue(value);
    expect(component.selectedDate).toBe(15);
    expect(component.selectedMonth).toBe(2);
    expect(component.selectedYear).toBe(2023);
    expect(component.formControl?.errors).toBeNull();
  });

  it('should format a valid date correctly', () => {
    const formattedDate = (component as any).formatDate(1, 2, 2023);
    expect(formattedDate).toBe('01-02-2023');
  });

  it('should validate dates correctly', () => {
    const isValid = (component as any).isValidDate(29, 2, 2020); // Leap year
    expect(isValid).toBeTrue();

    const isInvalid = (component as any).isValidDate(29, 2, 2021); // Non-leap year
    expect(isInvalid).toBeFalse();
  });

  it('should set required error if date is not selected and required validator is applied', () => {
    component.formControl?.setValidators([Validators.required]);
    component.formControl?.updateValueAndValidity();
    component.onDateChange(); // No date selected
    expect(component.formControl?.errors).toEqual({ required: true });
  });
});
