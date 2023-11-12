import {Component, Input, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {HomeComponent} from '../home/home.component'
import {DeletingReleaseInfo} from "../../_models/request.model";
import {DataService} from '../../services/data-service.service';
import {ModifyReleaseListResponse} from "../../_models/response.model";
import {ReleaseInfo} from '../../_models/data.model';

@Component({
    selector: 'app-release-list',
    templateUrl: './release-list.component.html',
    styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
    @Input() releaseList: ReleaseInfo[] = [];
    deletingReleaseInfo: DeletingReleaseInfo = {releaseNumber: 0};
    selectedRowIndex: number | null = null;
    hoveredRowIndex: number | null = null;

    constructor(private homeComponent: HomeComponent,
                private changeDetectorRef: ChangeDetectorRef,
                private dataService: DataService) {

    }

    ngOnInit() {
        this.updateReleaseList();
    }

    ngAfterViewInit() {
        this.releaseList = this.homeComponent.releaseList;
        this.changeDetectorRef.detectChanges();
    }

    ngOnChanges() {
        this.releaseList = this.homeComponent.releaseList;
        this.changeDetectorRef.detectChanges();
    }

    handleRowHover(index: number | null) {
        this.hoveredRowIndex = index;
    }

    handleRowClick(index: number) {
        this.selectedRowIndex = index;
        console.log(index);
    }

    updateReleaseList(){
        this.homeComponent.releaseListChanged.subscribe((newReleaseList: ReleaseInfo[]) => {
            this.releaseList = newReleaseList;
            console.log(`releaseList обновлен: ${JSON.stringify(this.releaseList)}`);
        });
    }

    deleteElement() {
        if (this.selectedRowIndex !== null && this.releaseList !== null)
            this.deletingReleaseInfo = {
                releaseNumber: this.releaseList[this.selectedRowIndex].releaseNumber
            };
        this.dataService.deleteElement(this.deletingReleaseInfo).subscribe({
                next: (response: ModifyReleaseListResponse) => {
                    if (response.message === 'too much')
                        alert('Найдено слишком много записей');
                    else if (response.message === 'no result')
                        alert('Не найдено записей');
                    console.log(`Ответ от сервера: ${JSON.stringify(response)}`);
                    this.homeComponent.receiveWeekData(this.homeComponent.selectedWeekData);
                },
            error: (err) => {
                console.log('Error:', err.propertyName);
            }
        });
        console.log(`deletingReleaseInfo отправленное на сервер ${JSON.stringify(this.deletingReleaseInfo)}`);
    }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteElement();
    }
  }

}
