import { Component, OnInit } from '@angular/core';
import { addMonths, subMonths, getDaysInMonth, startOfMonth, endOfMonth, addDays, isWeekend, getDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  selectedMonth: Date = new Date();
  calendarDays: Date[][] = [];

  constructor() {
    this.selectedMonth = new Date();
  }

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar() {
    this.calendarDays = [];
    const firstDay = startOfMonth(this.selectedMonth);
    const lastDay = endOfMonth(this.selectedMonth);

    let currentWeek: Date[] = [];

    const startDayOfWeek = getDay(firstDay);
    const daysInPreviousMonth = startDayOfWeek - 1;

    // Добавляем дни предыдущего месяца, если начало недели не в понедельник
    for (let i = daysInPreviousMonth; i > 0; i--) {
      const date = subMonths(firstDay, 1);
      date.setDate(getDaysInMonth(date) - i + 1);
      currentWeek.push(date);
    }

    for (let date = firstDay; date <= lastDay; date = addDays(date, 1)) {
      if (!isWeekend(date)) {
        currentWeek.push(date);
        if (currentWeek.length === 5) {
          this.calendarDays.push([...currentWeek]);
          currentWeek = [];
        }
      }
    }

    // Добавляем дни следующего месяца только, если текущий месяц не декабрь
    if (this.selectedMonth.getMonth() < 11) {
      const endDayOfWeek = getDay(lastDay);
      const daysInNextMonth = 5 - endDayOfWeek;

      if (daysInNextMonth > 0) {
        for (let i = 1; i <= daysInNextMonth; i++) {
          const date = addMonths(lastDay, 1);
          date.setDate(i);
          currentWeek.push(date);
        }
      }
    }

    if (currentWeek.length > 0) {
      this.calendarDays.push([...currentWeek]);
    }
  }

  changeMonth(increment: number) {
    this.selectedMonth = increment > 0 ? addMonths(this.selectedMonth, 1) : subMonths(this.selectedMonth, 1);
    this.updateCalendar();
  }

}
