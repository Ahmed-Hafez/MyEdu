import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  standalone: true
})
export class RadioGroupComponent {
  title: InputSignal<string> = input.required<string>();
  controlName: InputSignal<string> = input.required<string>();
  options: InputSignal<any[]> = input.required<any[]>();
  optionValue = input<string>();
  optionLabel = input<string>();
}
