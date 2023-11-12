import {Component, Input} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {TAGS} from '../../_constants/constants';
import {ModifyReleaseListResponse} from '../../_models/response.model';
import {AddingReleaseInfo} from '../../_models/request.model';
import {DataService} from '../../services/data-service.service';

@Component({
  selector: 'app-window-with-input',
  templateUrl: './window-with-input.component.html',
  styleUrls: ['./window-with-input.component.css']
})
export class WindowWithInputComponent {
  @Input() contentComponent: any | null;

  currentIndex = 0;
  releaseTag = TAGS[this.currentIndex];
  releaseNumber: string | undefined| null;

  constructor(private homeComponent: HomeComponent, private dataService: DataService) {
    this.homeComponent.windowContentComponent.subscribe((newContentComponent: string[]) => {
      this.contentComponent = newContentComponent;
      console.log(`contentComponent обновлен: ${JSON.stringify(this.contentComponent)}`);
    });
  }

  addElement() {
    console.log(this.releaseNumber);
    if (this.releaseNumber) {
      let addingReleaseInfo: AddingReleaseInfo = {releaseNumber: parseInt(this.releaseNumber, 10), releaseTag: this.releaseTag};
      this.dataService.addElement(addingReleaseInfo).subscribe({
        next: (response: ModifyReleaseListResponse) => {
          if (response.message === 'entry exists')
            alert('Такой релиз уже есть');
          console.log(`Ответ от сервера: ${JSON.stringify(response)}`);
          this.homeComponent.receiveWeekData(this.homeComponent.selectedWeekData);
        },
        error: (err) => {
          console.log('Error:', err.propertyName);
        }
      });
      console.log(`addingReleaseInfo отправленное на сервер ${JSON.stringify(addingReleaseInfo)}`);
      this.releaseNumber = null;
    } else alert('Номер релиза не должен быть пустым!');

  };

  switchTag() {
    this.currentIndex = (this.currentIndex + 1) % TAGS.length;
    this.releaseTag = TAGS[this.currentIndex];
  }

}
