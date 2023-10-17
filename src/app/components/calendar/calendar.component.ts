import { Component, OnInit } from '@angular/core';
import { addMonths, subMonths, startOfMonth, endOfMonth, addDays, isWeekend } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selectedMonth: Date = new Date();
  calendarDays: Date[][] = [];
  previousMonthDates: number[] = [];


  constructor() {}

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar() {
    this.calendarDays = [];
    const firstDay = startOfMonth(this.selectedMonth);
    const lastDay = endOfMonth(this.selectedMonth);
    const firstDayOfPreviousMonth = startOfMonth(subMonths(this.selectedMonth, 1));
    const lastDayOfPreviousMonth = endOfMonth(subMonths(this.selectedMonth, 1));

    let previousDate = firstDayOfPreviousMonth;
    while (previousDate <= lastDayOfPreviousMonth) {
      this.previousMonthDates.push(previousDate.getDate());
      previousDate = addDays(previousDate, 1);
    }


    let currentDate = firstDay;

    // Находим первый будний день месяца, исключая выходные
    while (isWeekend(currentDate)) {
      currentDate = addDays(currentDate, 1);
    }

    const currentWeek: Date[] = [];
    let firstWeek = true;

    while (currentDate <= lastDay) {
      if (firstWeek && currentDate.getDate() === 1 && currentDate.getDay() > 1 && currentDate.getDay() <= 5) {
        // Если первое число текущего месяца попадает на вторник-пятницу, добавляем числа предыдущего месяца
        let i = this.previousMonthDates.length - 1;
        while (i >= 0) {
          const lastPrevMonthDay = this.previousMonthDates[i];
          if (isWeekend(lastPrevMonthDay)) break;
          currentWeek.unshift(new Date(lastPrevMonthDay));
          i--;
        }
        firstWeek = false; // Указываем, что первая неделя уже обработана
      } else if (!isWeekend(currentDate)) { // Проверка на будний день
        currentWeek.push(currentDate);
      }

      if (currentDate.getDate() === lastDay.getDate() && currentDate.getDay() >= 1 && currentDate.getDay() <= 4) {
        // Если последнее число текущего месяца попадает на понедельник-четверг, добавляем числа следующего месяца
        let nextMonthFirstDay = addMonths(lastDay, 1);
        while (currentWeek.length < 25 && (nextMonthFirstDay.getDay() !== 0 && nextMonthFirstDay.getDay() !== 5)) {
          currentWeek.push(new Date(nextMonthFirstDay.getFullYear(), nextMonthFirstDay.getMonth(), nextMonthFirstDay.getDate()));
          nextMonthFirstDay = addDays(nextMonthFirstDay, 1);
        }
      }

      if (currentWeek.length === 5) {
        this.calendarDays.push(currentWeek.slice()); // Создаем копию массива недели
        currentWeek.length = 0; // Очищаем массив для следующей недели
      }

      currentDate = addDays(currentDate, 1);
    }

    if (currentWeek.length > 0) {
      this.calendarDays.push(currentWeek); // Добавляем оставшуюся неполную неделю
    }
  }

  changeMonth(increment: number) {
    this.selectedMonth = increment > 0 ? addMonths(this.selectedMonth, 1) : subMonths(this.selectedMonth, 1);
    this.updateCalendar();
  }

  formatMonthName(date: Date): string {
    const month = new Intl.DateTimeFormat('ru', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }
}
