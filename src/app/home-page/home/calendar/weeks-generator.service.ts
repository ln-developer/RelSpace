import { Injectable } from '@angular/core';
import {addDays, addMonths, endOfMonth, getDay, isWeekend, startOfMonth, subMonths} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class WeeksGeneratorService {

  private selectedMonth: any;
  private firstDaySelMonth: any;
  private lastDaySelMonth: any;
  public calendarWeeks: Date[][] = [];


  constructor() { }

  setDates(month: Date, firstDay: Date, lastDay: Date) {
    this.selectedMonth = month;
    this.firstDaySelMonth = firstDay;
    this.lastDaySelMonth = lastDay;
    this.updateCalendar();
    return this.calendarWeeks;
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
}
