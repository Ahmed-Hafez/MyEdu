import {
  Component,
  computed,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Select } from 'primeng/select';

/**
 * A custom date selector component that integrates with Angular forms.
 * Implements ControlValueAccessor to work seamlessly as a form control.
 */
@Component({
  selector: 'app-date-select-input',
  templateUrl: './date-select-input.component.html',
  styleUrls: ['./date-select-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DateSelectInputComponent,
      multi: true,
    },
  ],
  imports: [Select, FormsModule],
})
export class DateSelectInputComponent
  implements ControlValueAccessor, OnInit, Validator
{
  dates: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: { name: string; index: number }[] = [
    { name: 'January', index: 1 },
    { name: 'February', index: 2 },
    { name: 'March', index: 3 },
    { name: 'April', index: 4 },
    { name: 'May', index: 5 },
    { name: 'June', index: 6 },
    { name: 'July', index: 7 },
    { name: 'August', index: 8 },
    { name: 'September', index: 9 },
    { name: 'October', index: 10 },
    { name: 'November', index: 11 },
    { name: 'December', index: 12 },
  ];

  years = computed(() => {
    // generate a range of years starting from the given start year
    let startYear = this.startYear();
    startYear = startYear && startYear < 2024 ? startYear : 2000;
    return Array.from(
      { length: new Date().getFullYear() - startYear + 1 },
      (_, i) => startYear + i
    );
  });
  selectedDate?: number;
  selectedMonth?: number;
  selectedYear?: number;

  startYear = input<number>(2000);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  injector = inject(Injector);
  formControl?: FormControl;

  ngOnInit(): void {
    this.retrieveFormControl();
  }

  /**
   * Retrieves the parent FormControl for validation and integration.
   */
  retrieveFormControl(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector
        .get(FormGroupDirective)
        .getControl(ngControl);
    } else {
      this.formControl = ngControl.control as FormControl;
    }
  }

  /**
   * Updates the component's state when the value changes.
   * @param value - The value written to the form control
   */
  writeValue(value: string): void {
    if (value) {
      const [day, month, year] = value.split('-').map(Number);
      if (this.isValidDate(day, month, year)) {
        this.selectedDate = day;
        this.selectedMonth = month;
        this.selectedYear = year;
      }
    }
  }

  /**
   * Validates the component's current value.
   * @param control - The `AbstractControl` instance.
   * @returns A validation error if the date is invalid; otherwise, `null`.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const [day, month, year] = control.value.split('-').map(Number);
      if (!this.isValidDate(day, month, year)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  /**
   * Registers a callback for when the value changes.
   * @param fn - Callback function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback for when the control is touched.
   * @param fn - Callback function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Optional method to handle the disabled state.
   * @param isDisabled - Whether the control is disabled
   */
  setDisabledState?(isDisabled: boolean): void {}

  /**
   * Handles changes to the selected date, month, or year.
   * Validates the date and propagates it to the parent form control.
   */
  onDateChange(): void {
    if (this.selectedDate && this.selectedMonth && this.selectedYear) {
      this.onTouched();
      if (
        this.isValidDate(
          this.selectedDate,
          this.selectedMonth,
          this.selectedYear
        )
      ) {
        const formattedDate = this.formatDate(
          this.selectedDate,
          this.selectedMonth,
          this.selectedYear
        );
        this.onChange(formattedDate);
      }
    }
  }

  /**
   * Formats the date into a `dd-mm-yyyy` string.
   * @param day - Day of the month
   * @param month - Month (1-based index)
   * @param year - Year
   * @returns Formatted date string
   */
  private formatDate(day: number, month: number, year: number): string {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    return `${pad(day)}-${pad(month)}-${year}`;
  }

  /**
   * Validates whether the provided day, month, and year form a valid date.
   * @param day - Day of the month
   * @param month - Month (1-based index)
   * @param year - Year
   * @returns Whether the date is valid
   */
  private isValidDate(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);

    // Check if the date parts match the input
    return (
      date.getFullYear() === year &&
      date.getMonth() === (month - 1) &&
      date.getDate() === day
    );
  }
}
