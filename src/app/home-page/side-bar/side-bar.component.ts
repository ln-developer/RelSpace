import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() contentComponent: any | null;
  imageUrl = './assets/default-avatar.png';
  engineerName: string = 'Василий Пупкин';

  chooseEngineer(){

  }

  releaseDetails(){

  }
}
