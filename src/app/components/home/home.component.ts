import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { ReleaseDataResponse } from '../../_models/response.model';
import { ReleaseListComponent } from '../release-list/release-list.component'
import {NullContentComponent} from "../null-content/null-content.component";
import {SelectedWeekData} from "../../_models/request.model";
import {ReleaseInfo} from '../../_models/data.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() releaseListChanged = new EventEmitter<object[]>()

  @Output() windowContentComponent = new EventEmitter<any>()

  releaseList: ReleaseInfo[] = [];
  contentComponent: any = ReleaseListComponent;
  nullComponent: any = NullContentComponent;
  releaseNumber: string = 'Release-XXXX';
  releaseStatus: string = 'Здесь будет статус в реальном времени';
  selectedWeekData: SelectedWeekData = { year: 0, weekIndex: 0, monthNumber: 0};


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  receiveWeekData(weekData: SelectedWeekData) {
    this.selectedWeekData = weekData;
    this.dataService.selectedWeek(weekData).subscribe({
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
}
