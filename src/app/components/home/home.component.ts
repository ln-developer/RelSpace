import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { ReleaseData } from '../../_models/response.model';
import { ReleaseListComponent } from '../release-list/release-list.component'
import {NullContentComponent} from "../null-content/null-content.component";
import {WeekData} from "../../_models/request.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() releaseListChanged = new EventEmitter<string[]>()

  @Output() sendContentComponent = new EventEmitter<any>()

  releaseList: string[] | null = [];
  releaseNumber: string = 'Release-XXXX';
  releaseStatus: string = 'Здесь будет статус в реальном времени';
  weekData: WeekData = { year: 0, weekIndex: 0, monthNumber: 0};
  contentComponent: any = ReleaseListComponent;
  nullComponent: any = NullContentComponent;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  receiveWeekData(weekData: WeekData) {
    this.weekData = weekData;
    this.dataService.selectedWeek(weekData).subscribe({
      next: (response: ReleaseData) => {
        if (response.releaseList !== null) {
          response.releaseList.sort((a: string, b: string) => a.localeCompare(b));
          this.releaseList = response.releaseList;
          this.releaseListChanged.emit(this.releaseList);
          this.sendContentComponent.emit(this.contentComponent);
        } else this.sendContentComponent.emit(this.nullComponent);
        console.log(`Ответ от сервера: ${JSON.stringify(response)}`)
      },
      error: (err) => {
        console.log('Error:', err.propertyName);
      }
    });
    console.log(`WeekData отправленная на сервер: ${JSON.stringify(weekData)}`);
  }
}
