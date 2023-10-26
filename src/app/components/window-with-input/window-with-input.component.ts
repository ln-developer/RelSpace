import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-window-with-input',
  templateUrl: './window-with-input.component.html',
  styleUrls: ['./window-with-input.component.css']
})
export class WindowWithInputComponent {
  @Input() dynamicComponent: any | null = ['Релизов пока нет'];

  addRelease(){

  }
}
