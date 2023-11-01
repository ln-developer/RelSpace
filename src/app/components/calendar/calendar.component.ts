import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WeeksGeneratorService} from './weeks-generator.service'
import {
  addMonths,
  endOfMonth,
  getMonth, getYear,
  startOfMonth, subDays,
  subMonths
} from 'date-fns';
import { WEEK_DAYS } from '../../_constants/constants';
import {SelectedWeekData} from "../../_models/request.model";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [WeeksGeneratorService]
})

export class CalendarComponent implements OnInit {
  @Output() selectedWeekData = new EventEmitter<SelectedWeekData>();

  protected readonly WEEK_DAYS:string[] = WEEK_DAYS;
  selectedMonth: Date = new Date();
  selectedRowIndex: number | null = null;
  hoveredRowIndex: number | null = null;
  firstDaySelMonth: Date = startOfMonth(this.selectedMonth);
  lastDaySelMonth: Date = endOfMonth(this.selectedMonth);
  calendarWeeks: Date[][] = [];
  constructor(private weeksGeneratorService: WeeksGeneratorService) {

  }

  ngOnInit(): void {
    this.updateCalendar();
    this.findCurrentWeek();
    this.sendData();
  }

  ngAfterViewInit() {
  }

  isOtherMonth(day: Date) {
    return !(getMonth(day) === getMonth(this.selectedMonth));
  }

  findCurrentWeek() {
    const currentDate = new Date();
    for (let cellNum = 0; cellNum < 2; cellNum++) {
      let foundRowIndex = this.selectedRowIndex;

      for (let i = 0; i < this.calendarWeeks.length; i++) {
        const week = this.calendarWeeks[i];
        for (let j = 0; j < week.length; j++) {
          const cellDate = week[j];

          if (cellDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
            foundRowIndex = i;
            this.selectedRowIndex = foundRowIndex;
            console.log(`ID текущей недели: ${foundRowIndex}`);
            break;
          } else subDays(currentDate, 1);
        }
      }
    }
  }

  handleRowHover(index: number | null) {
    this.hoveredRowIndex = index;
  }

  handleRowClick(index: number) {
    this.selectedRowIndex = index;
    console.log(`ID выбранной недели: ${index}`);
  }

  updateCalendar(){
   this.calendarWeeks = this.weeksGeneratorService.setDates(this.selectedMonth, this.firstDaySelMonth, this.lastDaySelMonth);
  }

  changeMonth(increment: number) {
    this.selectedMonth = increment > 0 ? addMonths(this.selectedMonth, 1) : subMonths(this.selectedMonth, 1);
    this.firstDaySelMonth = startOfMonth(this.selectedMonth);
    this.lastDaySelMonth = endOfMonth(this.selectedMonth);
    this.updateCalendar();
    this.selectedRowIndex = null;
  }

  formatMonthName(date: Date): string {
    const month = new Intl.DateTimeFormat('ru', {month: 'long'}).format(date);
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  sendData() {
    const selectedWeekData = {
      year: getYear(this.selectedMonth),
      monthNumber: getMonth(this.selectedMonth) + 1,
      weekIndex: this.selectedRowIndex,
    };
    this.selectedWeekData.emit(selectedWeekData);
  }
}
