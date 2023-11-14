import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() contentComponent: any | null;
  imageUrl = './assets/default-avatar.png';
  engineerName: string = 'Василий Пупкин';

  constructor(private router: Router) {
  }

  chooseEngineer(){
  }

  releaseDetails(){
    this.router.navigate(['/release-details']).then((result) => {
      console.log('Перешли на страницу release-details', result);
    }).catch((error) => {
      console.error('Ошибка при переходе на страницу release-details', error);
    });
  }
}
