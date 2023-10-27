import {Component, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component'

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  releaseList: string[] = ['Релизов пока нет'];
  selectedRowIndex: number | null = null;
  hoveredRowIndex: number | null = null;

  constructor(private homeComponent: HomeComponent) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.releaseList = this.homeComponent.releaseList;
  }

  ngOnChanges(){
    this.releaseList = this.homeComponent.releaseList;
  }

  setDefault(){
    if (this.releaseList === null) {
      this.releaseList = ['Релизов пока нет']
    }
  }

  handleRowHover(i: number | null) {
    this.hoveredRowIndex = i;
  }

  handleRowClick(index: number) {
    this.selectedRowIndex = index;
    console.log(index);
  }

  deleteElement(){
  }
}
