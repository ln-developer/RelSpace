import { Component } from '@angular/core';
import { ReleaseListComponent } from '../release-list/release-list.component'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  imageUrl = './assets/default-avatar.png';
  engineerName: string = 'Василий Пупкин';
  dynamicComponent = ReleaseListComponent;
}
