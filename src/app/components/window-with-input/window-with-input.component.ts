import {Component, Input} from '@angular/core';
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-window-with-input',
  templateUrl: './window-with-input.component.html',
  styleUrls: ['./window-with-input.component.css']
})
export class WindowWithInputComponent {
  @Input() contentComponent: any | null;

  constructor(private homeComponent: HomeComponent) {
    this.homeComponent.windowContentComponent.subscribe((newContentComponent: string[]) => {
      this.contentComponent = newContentComponent;
      console.log(`contentComponent обновлен: ${JSON.stringify(this.contentComponent)}`);
    });
  }

  addEelement(){

  }
}
