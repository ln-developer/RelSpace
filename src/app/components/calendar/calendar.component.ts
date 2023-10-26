import {Component, OnInit} from '@angular/core';
import {
  addDays,
  addMonths,
  endOfMonth,
  getDate,
  getDay, getMonth,
  isWeekend,
  startOfMonth, subDays,
  subMonths
} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {
  private readonly WEEK_DAYS: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
  public weekDays: string[];
  selectedMonth: Date = new Date();
  selectedRowIndex: number | null = null;
  calendarWeeks: Date[][] = [];
  firstDaySelMonth: Date = startOfMonth(this.selectedMonth);
  lastDaySelMonth: Date = endOfMonth(this.selectedMonth);
  hoveredRowIndex: number | null = null;

  constructor() {
    this.weekDays = this.WEEK_DAYS;
  }

  ngOnInit(): void {
    this.updateCalendar();
  }

  ngAfterViewInit() {
    this.findCurrentWeek();
  }

  isOtherMonth(day: Date) {
    return !(getMonth(day) === getMonth(this.selectedMonth));
  }

  findCurrentWeek() {
    for (let cellNum = 0; cellNum < 2; cellNum++) {
      const currentDay = new Date().getDate();
      let foundRowIndex = this.selectedRowIndex;

      for (let i = 0; i < this.calendarWeeks.length; i++) {
        const week = this.calendarWeeks[i];
        for (let j = 0; j < week.length; j++) {
          const cellDate = week[j];
          const cellDay = getDate(cellDate);

          if (cellDay === currentDay) {
            foundRowIndex = i;
            break;
          } else subDays(currentDay, 1);
        }
      }
      this.selectedRowIndex = foundRowIndex;
      console.log(foundRowIndex);
    }
  }

  handleRowHover(i: number | null) {
    this.hoveredRowIndex = i;
  }

  handleRowClick(index: number) {
    this.selectedRowIndex = index;
    console.log(index);
  }

  updateCalendar() {
    const prevMonthArr = this.generateMonthsArr(subMonths(this.selectedMonth, 1));
    const nextMonthArr = this.generateMonthsArr(addMonths(this.selectedMonth, 1));
    let calendarDays: Date[] = [];

    for (let date = this.firstDaySelMonth; date <= this.lastDaySelMonth; date = addDays(date, 1)) {

      if (date === this.firstDaySelMonth) {
        const firstDay = getDay(date);
        if (firstDay > 1 && firstDay <= 5) {
          for (let i = 0; i < 5 - (6 - firstDay); i++) {
            calendarDays.unshift(prevMonthArr[i]);
          }
        }
      }

      if (!isWeekend(date)) {
        calendarDays.push(date);
      }

      if (date.setHours(0, 0, 0, 0) === this.lastDaySelMonth.setHours(0, 0, 0, 0)) {
        const lastDay = getDay(date);
        if (lastDay >= 1 && lastDay < 5) {
          for (let i = 0; i < 5 - lastDay; i++) {
            calendarDays.push(nextMonthArr[i]);
          }
        }
      }
    }
    this.calendarWeeks = this.splitArrayIntoWeeks(calendarDays);
  }

  splitArrayIntoWeeks(array: Date[]): Date[][] {
    const weeks: Date[][] = [];
    let week: Date[] = [];

    array.forEach((date, index) => {
      week.push(date);

      if (week.length === 5 || index === array.length - 1) {
        weeks.push(week);
        week = [];
      }
    });
    return weeks;
  }

  generateMonthsArr(month: Date) {

    const firstDay = startOfMonth(month);
    const lastDay = endOfMonth(month);
    const monthDays: Date[] = [];

    if (month < this.selectedMonth) {
      for (let date: Date = firstDay; date <= lastDay; date = addDays(date, 1)) {
        monthDays.unshift(date);
      }
    } else {
      for (let date: Date = firstDay; date <= lastDay; date = addDays(date, 1)) {
        monthDays.push(date);
      }
    }
    return monthDays;
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
}
