import { Component, OnInit } from '@angular/core';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  isWeekend,
  getDay,
  getDate
} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selectedMonth: Date = new Date();
  selectedRowIndex: number = 0;
  calendarDays: Date[] = [];
  prevMonthArr: Date[] = [];
  nextMonthArr: Date[] = [];
  calendarWeeks: Date[][] = [];
  firstDaySelMonth: Date = startOfMonth(this.selectedMonth);
  lastDaySelMonth: Date = endOfMonth(this.selectedMonth);
  firstDayPrevMonth: Date = startOfMonth(subMonths(this.selectedMonth, 1));
  lastDayPrevMonth: Date = endOfMonth(subMonths(this.selectedMonth, 1));
  firstDayNextMonth: Date = startOfMonth(addMonths(this.selectedMonth, 1));
  lastDayNextMonth: Date = endOfMonth(addMonths(this.selectedMonth, 1));

  constructor() {}


  ngOnInit(): void {
    this.updateCalendar();
  }

  ngAfterViewInit(){
    this.findCurrentWeek();

    document.querySelectorAll('.calendar-week').forEach((row, index) => {
      const isSelected = index === this.selectedRowIndex;
      this.setRowStyles(row, isSelected);
    });
    this.updateMouseOverHandlers();
  }

  ngAfterViewChecked() {
    this.updateMouseOverHandlers();
  }

  findCurrentWeek() {
    let dayOfMonth = getDate(this.selectedMonth);
    let foundRowIndex = -1;

    document.querySelectorAll('.calendar-week').forEach((row, index) => {
      row.querySelectorAll('td').forEach((cell) => {
        const cellContent = cell.textContent?.trim();
        if (cellContent) {
          const cellNumber = parseInt(cellContent, 10);

          if (!isNaN(cellNumber) && cellNumber === dayOfMonth) {
            foundRowIndex = index;
            return;
          }
        }
      });
    });

    if (foundRowIndex >= 0) {
      this.selectedRowIndex = foundRowIndex;
    } else {
      dayOfMonth--;
    }
    console.log(this.selectedRowIndex);
  }

  handleRowClick(index: number) {
    this.selectedRowIndex = index;
    console.log(index);
    document.querySelectorAll('.calendar-week').forEach((row, rowIndex) => {
      row.querySelectorAll('td').forEach(cell => {
        if (rowIndex === index) {
          cell.style.backgroundColor = '#FF6C6C';
          cell.style.color = 'white';
        } else {
          cell.style.backgroundColor = 'transparent';
          cell.style.color = 'black';
        }
      });
    });
  }

  updateCalendar() {
    this.prevMonthArr = [];
    this.nextMonthArr = [];
    this.calendarDays = [];

    for (let date = this.firstDayPrevMonth; date <= this.lastDayPrevMonth; date = addDays(date, 1)) {
      this.prevMonthArr.unshift(date);
    }

    for (let date = this.firstDayNextMonth; date <= this.lastDayNextMonth; date = addDays(date, 1)) {
      this.nextMonthArr.push(date);
    }

    for (let date = this.firstDaySelMonth; date <= this.lastDaySelMonth; date = addDays(date, 1)) {

      if (date === this.firstDaySelMonth) {
        const firstDay = getDay(date);
        if (firstDay > 1 && firstDay <= 5) {
          for (let i = 0; i < 5 - (6 - firstDay); i++) {
            this.calendarDays.unshift(this.prevMonthArr[i]);
          }
        }
      }

      if (!isWeekend(date)) {
        this.calendarDays.push(date);
      }

      if (date.setHours(0, 0, 0, 0) === this.lastDaySelMonth.setHours(0, 0, 0, 0)) {
        const lastDay = getDay(date);
        if (lastDay >= 1 && lastDay < 5) {
          for (let i = 0; i < 5 - lastDay; i++) {
            this.calendarDays.push(this.nextMonthArr[i]);
          }
        }
      }
    }
    this.calendarWeeks = this.splitArrayIntoWeeks(this.calendarDays);

  }

  splitArrayIntoWeeks(array: Date[]): Date[][] {
    const weeks: Date[][] = [];
    let week: Date[] = [];
    for (const date of array) {
      week.push(date);
      if (week.length === 5) {
        weeks.push(week);
        week = [];
      }
    }
    return weeks;
  }

  changeMonth(increment: number) {
    this.selectedMonth = increment > 0 ? addMonths(this.selectedMonth, 1) : subMonths(this.selectedMonth, 1);
    this.firstDaySelMonth = startOfMonth(this.selectedMonth);
    this.lastDaySelMonth = endOfMonth(this.selectedMonth);
    this.firstDayPrevMonth = startOfMonth(subMonths(this.selectedMonth, 1));
    this.lastDayPrevMonth = endOfMonth(subMonths(this.selectedMonth, 1));
    this.firstDayNextMonth = startOfMonth(addMonths(this.selectedMonth, 1));
    this.lastDayNextMonth = endOfMonth(addMonths(this.selectedMonth, 1));
    this.updateCalendar();
    this.selectedRowIndex = -1;
  }

  setRowStyles(row: Element, isSelected: boolean): void {
    const color = isSelected ? '#FF6C6C' : 'transparent';
    const textColor = isSelected ? 'white' : 'black';
    row.querySelectorAll('td').forEach(cell => {
      cell.style.backgroundColor = color;
      cell.style.color = textColor;
    });
  }

  updateMouseOverHandlers() {
    document.querySelectorAll('.calendar-week').forEach(row => {
      row.removeEventListener('mouseover', this.handleMouseOver as EventListener);
      row.removeEventListener('mouseout', this.handleMouseOut as EventListener);
      row.addEventListener('mouseover', this.handleMouseOver as EventListener);
      row.addEventListener('mouseout', this.handleMouseOut as EventListener);
    });
  }

  handleMouseOver = (event: MouseEvent) => {
    const index = Array.from(document.querySelectorAll('.calendar-week')).indexOf(event.currentTarget as Element);

    if (index !== this.selectedRowIndex) {
      (event.currentTarget as Element).querySelectorAll('td').forEach(cell => {
        cell.style.backgroundColor = '#f3f3f3';
      });
    }
  }

  handleMouseOut = (event: MouseEvent) => {
    const index = Array.from(document.querySelectorAll('.calendar-week')).indexOf(event.currentTarget as Element);

    if (index !== this.selectedRowIndex) {
      (event.currentTarget as Element).querySelectorAll('td').forEach(cell => {
        cell.style.backgroundColor = 'transparent';
        cell.style.color = 'black';
      });
    }
  }

  formatMonthName(date: Date): string {
    const month = new Intl.DateTimeFormat('ru', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }
}
