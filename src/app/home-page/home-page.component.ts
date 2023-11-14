import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  releaseNumber: string = 'Release-XXXX';
  releaseStatus: string = 'Здесь будет статус в реальном времени';


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
