import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {HomeComponent} from '../home/home.component'

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  @Input() releaseList: string[] | null = [];
  selectedRowIndex: number | null = null;
  hoveredRowIndex: number | null = null;

  constructor(private homeComponent: HomeComponent, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.homeComponent.releaseListChanged.subscribe((newReleaseList: string[]) => {
      this.releaseList = newReleaseList;
      console.log(`releaseList обновлен: ${JSON.stringify(this.releaseList)}`);
    });
  }

  ngAfterViewInit(){
    this.releaseList = this.homeComponent.releaseList;
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(){
    this.releaseList = this.homeComponent.releaseList;
    this.changeDetectorRef.detectChanges();
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
