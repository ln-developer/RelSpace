import {Component, Input, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {ReleaseInfo} from '../../../../_models/data.model';
import {ReleaseDataManagementService} from '../../../services/releases-data-management/release-data-management.service';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  @Input() releaseList: ReleaseInfo[] = [];
  selectedRowIndex: number | null = null;
  hoveredRowIndex: number | null = null;

  constructor(private releaseDataManagementService: ReleaseDataManagementService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.updateReleaseList();
  }

  ngAfterViewInit() {
    this.releaseList = this.releaseDataManagementService.releaseList;
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    this.releaseList = this.releaseDataManagementService.releaseList;
    this.changeDetectorRef.detectChanges();
  }

  handleRowHover(index: number | null) {
    this.hoveredRowIndex = index;
  }

  handleRowClick(index: number) {
    this.selectedRowIndex = index;
    console.log(index);
  }

  updateReleaseList() {
    this.releaseDataManagementService.releaseListChanged.subscribe((newReleaseList: ReleaseInfo[]) => {
      this.releaseList = newReleaseList;
      console.log(`releaseList обновлен: ${JSON.stringify(this.releaseList)}`);
    });
  }

  deleteElement(){
    this.releaseDataManagementService.deleteElement(this.selectedRowIndex);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.releaseDataManagementService.deleteElement(this.selectedRowIndex);
    }
  }

}
