import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {HomeComponent} from '../home/home.component'
import {DeletingReleaseInfo} from "../../_models/request.model";
import {DataService} from '../../services/data-service.service';
import {DeleteReleaseResponse} from "../../_models/response.model";

@Component({
    selector: 'app-release-list',
    templateUrl: './release-list.component.html',
    styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
    @Input() releaseList: string[] | null = [];
    deletingReleaseInfo: DeletingReleaseInfo = {releaseNumber: ''};
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
        this.homeComponent.releaseListChanged.subscribe((newReleaseList: string[]) => {
            this.releaseList = newReleaseList;
            console.log(`releaseList обновлен: ${JSON.stringify(this.releaseList)}`);
        });
    }

    deleteElement() {
        if (this.selectedRowIndex !== null && this.releaseList !== null)
            this.deletingReleaseInfo = {
                releaseNumber: this.releaseList[this.selectedRowIndex]
            };
        this.dataService.deleteElement(this.deletingReleaseInfo).subscribe({
                next: (response: DeleteReleaseResponse) => {
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
}
