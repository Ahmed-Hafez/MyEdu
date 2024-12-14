import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/header/header.component';

declare type Step = {title: string; description: string};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent],
})
export class HomePage {
  steps: Step[] = [
    {
      title: 'Subscribe',
      description: `Select a subscription plan that suits your child's learning needs and preferences.`
    },
    {
      title: 'Personalise your box',
      description: `Tell us about your child's age, interests, and learning goals, and we'll customize their surprise box accordingly.`
    },
    {
      title: 'Receive your surprise box',
      description: `Sit back and relax as your child eagerly awaits the arrival of their monthly surprise box filled with engaging learning materials.`
    },
  ]
}
