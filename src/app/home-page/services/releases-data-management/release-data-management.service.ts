import {EventEmitter, Injectable, Output} from '@angular/core';
import {AddingReleaseInfo, DeletingReleaseInfo, SelectedWeekData} from '../../../_models/request.model';
import {ModifyReleaseListResponse, ReleaseDataResponse} from '../../../_models/response.model';
import {RequestService} from '../../../shared/services/request/request-service.service';
import {ReleaseInfo} from '../../../_models/data.model';
import {ReleaseListComponent} from '../../home/side-bar/window-with-input/release-list/release-list.component';
import {NullContentComponent} from '../../home/side-bar/window-with-input/null-content/null-content.component';

@Injectable({
  providedIn: 'root'
})
export class ReleaseDataManagementService {
  @Output() releaseListChanged = new EventEmitter<object[]>();
  @Output() windowContentComponent = new EventEmitter<any>();

  selectedWeekData: SelectedWeekData = { year: 0, weekIndex: 0, monthNumber: 0};
  releaseList: ReleaseInfo[] = [];
  contentComponent: any = ReleaseListComponent;
  nullComponent: any = NullContentComponent;
  deletingReleaseInfo: DeletingReleaseInfo = {releaseNumber: 0};
  constructor(private requestService: RequestService) { }

  getWindowComponent(){
    return this.windowContentComponent;
  }

  receiveWeekData(weekData: SelectedWeekData) {
    this.selectedWeekData = weekData;
    this.requestService.getReleasesForSelectedWeek(weekData).subscribe({
      next: (response: ReleaseDataResponse) => {
        if (response.releaseList.length !== 0) {
          this.releaseList = response.releaseList;
          this.releaseListChanged.emit(this.releaseList);
          this.windowContentComponent.emit(this.contentComponent);
        } else this.windowContentComponent.emit(this.nullComponent);
        console.log(`Ответ от сервера: ${JSON.stringify(response)}`)
      },
      error: (err) => {
        console.log('Error:', err.propertyName);
      }
    });
    console.log(`WeekData отправленная на сервер: ${JSON.stringify(weekData)}`);
  }

  addElement(releaseNumber: string | undefined| null, releaseTag: string) {
    console.log(releaseNumber);
    if (releaseNumber) {
      let addingReleaseInfo: AddingReleaseInfo = {releaseNumber: parseInt(releaseNumber, 10), releaseTag: releaseTag};
      this.requestService.addRelease(addingReleaseInfo).subscribe({
        next: (response: ModifyReleaseListResponse) => {
          if (response.message === 'entry exists')
            alert('Такой релиз уже есть');
          console.log(`Ответ от сервера: ${JSON.stringify(response)}`);
          this.receiveWeekData(this.selectedWeekData);
        },
        error: (err) => {
          console.log('Error:', err.propertyName);
        }
      });
      console.log(`addingReleaseInfo отправленное на сервер ${JSON.stringify(addingReleaseInfo)}`);
      releaseNumber = null;
    } else alert('Номер релиза не должен быть пустым!');
  };

  deleteElement(selectedRowIndex: number | null) {
    if (selectedRowIndex !== null && this.releaseList !== null)
      this.deletingReleaseInfo = {
        releaseNumber: this.releaseList[selectedRowIndex].releaseNumber
      };
    this.requestService.deleteRelease(this.deletingReleaseInfo).subscribe({
      next: (response: ModifyReleaseListResponse) => {
        if (response.message === 'too much')
          alert('Найдено слишком много записей');
        else if (response.message === 'no result')
          alert('Не найдено записей');
        console.log(`Ответ от сервера: ${JSON.stringify(response)}`);
        this.receiveWeekData(this.selectedWeekData);
      },
      error: (err) => {
        console.log('Error:', err.propertyName);
      }
    });
    console.log(`deletingReleaseInfo отправленное на сервер ${JSON.stringify(this.deletingReleaseInfo)}`);
  }
}
