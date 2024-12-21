import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    DateSelectInputComponent
  ],
})
export class SubscribePage {
  topics: string[] = [
    'Arabic',
    'Islamic',
    'English',
    'History',
    'Sports',
  ]
}
