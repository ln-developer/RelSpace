import {Component, Input, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component'

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  @Input() releaseList: string[] | undefined;
  selectedRowIndex: number | null = null;
  hoveredRowIndex: number | null = null;

  constructor(private homeComponent: HomeComponent) {
    this.homeComponent.releaseListChanged.subscribe((newReleaseList: string[]) => {
      this.releaseList = newReleaseList;
      console.log(`releaseList обновлен: ${JSON.stringify(this.releaseList)}`);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.releaseList = this.homeComponent.releaseList;
  }

  ngOnChanges(){
    this.releaseList = this.homeComponent.releaseList;
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
