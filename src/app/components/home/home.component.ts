import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  releaseData: object = {};
  releaseNumber: string = 'Release XXX3';
  releaseStatus: string = 'Установка на ПРОД';
  weekData: object = {};

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData().subscribe((result) => {
      this.releaseData = result;
    });
  }

  receiveWeekData(weekData: Object) {
    this.weekData = weekData;
    console.log(weekData);
  }

}
