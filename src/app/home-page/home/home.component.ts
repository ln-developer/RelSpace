import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  releaseNumber: string = 'Release-XXXX';
  releaseStatus: string = 'Здесь будет статус в реальном времени';


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
