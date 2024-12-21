import { Component, computed, input, OnInit } from '@angular/core';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-date-select-input',
  templateUrl: './date-select-input.component.html',
  styleUrls: ['./date-select-input.component.scss'],
  standalone: true,
  imports: [
    Select
  ]
})
export class DateSelectInputComponent {
  dates: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years = computed(() => {
    let startYear = this.startYear();
    startYear = startYear && startYear < 2024 ? startYear : 2000;
    return Array.from(
      { length: new Date().getFullYear() - startYear + 1 },
      (_, i) => startYear + i
    );
  });

  startYear = input<number>(2000);
}
