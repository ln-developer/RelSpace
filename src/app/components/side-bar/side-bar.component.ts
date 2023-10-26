import { Component } from '@angular/core';
// import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  imageUrl = './assets/default-avatar.png';
  engineerName: string = 'Василий Пупкин';
  dynamicComponent = '';
}
