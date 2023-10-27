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

  releaseList: string[] = ['Release-XXX1', 'Release-XXX2', 'Release-XXX3', 'Release-XXX4', 'Release-XXX5', 'Release-XXX6'];

  constructor(private dataService: DataService) {
  }
  ngOnInit() {

  }

  ngAfterViewInit(){
    this.dataService.getData().subscribe((result) => {
      this.releaseData = result;
    });
  }

  receiveWeekData(weekData: Object) {
    this.weekData = weekData;
    console.log(weekData);
  }

}
