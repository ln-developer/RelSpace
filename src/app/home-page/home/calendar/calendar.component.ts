import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {WeeksGeneratorService} from './services/weeks-generator.service'
import {
  addMonths,
  endOfMonth,
  getMonth, getYear,
  startOfMonth, subDays,
  subMonths
} from 'date-fns';
import {WEEK_DAYS} from '../../../_constants/constants';
import {SelectedWeekData} from "../../../_models/request.model";
import {ReleaseDataManagementService} from '../../services/releases-data-management/release-data-management.service'

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
  constructor(private weeksGeneratorService: WeeksGeneratorService, private releaseDataManagementService: ReleaseDataManagementService ) {

  }

  ngOnInit(): void {
    this.updateCalendar();
    this.findCurrentWeek();
    this.sendSelectedWeekData();
  }

  ngAfterViewInit() {
  }

  isOtherMonth(day: Date) {
    return !(getMonth(day) === getMonth(this.selectedMonth));
  }

  findCurrentWeek() {
    let currentDate = new Date();
    for (let cellNum = 0; cellNum <= 2; cellNum++) {
      let foundRowIndex = this.selectedRowIndex;
      let weekFound = false;

      for (let i = 0; i < this.calendarWeeks.length; i++) {
        const week = this.calendarWeeks[i];
        for (let j = 0; j < week.length; j++) {
          const cellDate = new Date(week[j]); // Создаем отдельный объект даты, чтобы не менять исходные данные

          if (cellDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
            foundRowIndex = i;
            this.selectedRowIndex = foundRowIndex;
            console.log(`ID текущей недели: ${foundRowIndex}`);
            weekFound = true;
            break;
          }
        }
        if (weekFound) {
          break;
        }
      }
      if (!weekFound) {
        currentDate = subDays(currentDate, 1); // Если нужная неделя не найдена, отнимаем один день от currentDate
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
    this.sendSelectedWeekData();
  }

  formatMonthName(date: Date): string {
    const month = new Intl.DateTimeFormat('ru', {month: 'long'}).format(date);
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  sendSelectedWeekData() {
    const selectedWeekData = {
      year: getYear(this.selectedMonth),
      monthNumber: getMonth(this.selectedMonth) + 1,
      weekIndex: this.selectedRowIndex,
    };
    this.releaseDataManagementService.receiveWeekData(selectedWeekData);
  }

  switchWeek(increment: number) {
    if (this.selectedRowIndex == null) {
      if (increment < 0) this.selectedRowIndex = -1;
      if (increment > 0) this.selectedRowIndex = 0;
    }
    const maxIndex = this.calendarWeeks[0].length - 1;
    // @ts-ignore
    this.selectedRowIndex = (this.selectedRowIndex - increment + maxIndex + 1) % (maxIndex + 1);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.changeMonth(1);
    }
    if (event.key === 'ArrowLeft') {
      this.changeMonth(-1);
    }
    if (event.key === 'ArrowUp') {
      this.switchWeek(1);
      this.sendSelectedWeekData();
    }
    if (event.key === 'ArrowDown') {
      this.switchWeek(-1);
      this.sendSelectedWeekData();
    }
  }
}
