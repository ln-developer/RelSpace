import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { ReleaseData } from '../../_models/response.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() releaseListChanged = new EventEmitter<string[]>()

  releaseList: string[] = [];
  releaseNumber: string = 'Release-XXXX';
  releaseStatus: string = 'Здесь будет статус в реальном времени';
  weekData: object = {};

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  receiveWeekData(weekData: object) {
    this.weekData = weekData;
    this.dataService.selectedWeek(weekData).subscribe({
      next: (response: ReleaseData) => {
        response.releaseList.sort((a: string, b: string) => a.localeCompare(b));
        this.releaseList = response.releaseList;
        this.releaseListChanged.emit(this.releaseList);
        console.log(`Ответ от сервера: ${JSON.stringify(response)}`)
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
    console.log(`WeekData отправленная на сервер: ${weekData}`);
  }
}
