import {Component} from '@angular/core';
import {TAGS} from '../../_constants/constants';
import {ReleaseDataManagementService} from '../services/releases-data-management/release-data-management.service'


@Component({
  selector: 'app-window-with-input',
  templateUrl: './window-with-input.component.html',
  styleUrls: ['./window-with-input.component.css']
})
export class WindowWithInputComponent {
  contentComponent: any | null = this.releaseDataManagementService.getWindowComponent();

  currentIndex = 0;
  releaseTag = TAGS[this.currentIndex];
  releaseNumber: string | undefined| null;

  constructor(private releaseDataManagementService: ReleaseDataManagementService) {
    this.releaseDataManagementService.windowContentComponent.subscribe((newContentComponent: string[]) => {
      this.contentComponent = newContentComponent;
      console.log(`contentComponent обновлен: ${JSON.stringify(this.contentComponent)}`);
    });
  }

  addElement(){
    this.releaseDataManagementService.addElement(this.releaseNumber, this.releaseTag);
    this.releaseNumber = null;
    this.releaseDataManagementService.receiveWeekData(this.releaseDataManagementService.selectedWeekData);
  }

  switchTag() {
    this.currentIndex = (this.currentIndex + 1) % TAGS.length;
    this.releaseTag = TAGS[this.currentIndex];
  }

}
