import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Host,
  inject,
  input,
  InputSignal,
  Optional,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class RadioGroupComponent implements ControlValueAccessor, AfterViewInit {
  title: InputSignal<string> = input.required<string>();
  controlName: string = 'app-radio-input';
  options: InputSignal<any[]> = input.required<any[]>();
  optionValue = input<string>();
  optionLabel = input<string>();
  value: any;

  onChange: any = () => {};
  onTouched: any = () => {};
  cdr = inject(ChangeDetectorRef);

  /**
   * Constructor that injects the `NgControl` if available.
   * Marks this component as the value accessor for the form control.
   *
   * @param ngControl - Parent `NgControl` (optional)
   */
  constructor(@Optional() private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    // initializes the control name (if exists) after the view is rendered.
    if(this.ngControl?.name) {
      this.controlName = this.ngControl.name as string;
      this.cdr.detectChanges();
    }
  }

  writeValue(value: any): void {
    this.value = value;
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
  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state
  }

  /**
   * Handles input changes from the radio buttons and propagates the new value to the form control.
   *
   * @param event - Input event from the radio buttons
   */
  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onChange(inputValue);
  }
}
