import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { RadioGroupComponent } from 'src/app/shared/radio-group/radio-group.component';
import { DateSelectInputComponent } from 'src/app/shared/date-select-input/date-select-input.component';

/**
 * A reusable radio group component that works as a custom Angular form control.
 * Implements ControlValueAccessor to work seamlessly as a form control.
 */
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    InputTextModule,
    Select,
    SelectButton,
    RadioGroupComponent,
    DateSelectInputComponent,
    ReactiveFormsModule
  ],
})
export class SubscribePage {
  topics: string[] = [
    'Arabic',
    'Islamic',
    'English',
    'History',
    'Sports',
  ];

  formBuilder = inject(FormBuilder);
  infoForm: FormGroup = this.formBuilder.group({
    contactInfo: this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }),
    childInfo: this.formBuilder.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      grade: ['', Validators.required],
      gender: ['', Validators.required],
      topics: [[], [Validators.required, Validators.min(3), Validators.maxLength(3)]]
    })
  });

  submit() {
    console.log(this.infoForm.get('childInfo.dateOfBirth'))
    console.log(this.infoForm)
    console.log(this.infoForm.value)
    console.log(this.infoForm.valid)
  }
}
