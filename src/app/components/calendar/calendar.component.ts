import { Component, OnInit } from '@angular/core';
import { addMonths, subMonths, startOfMonth, endOfMonth, addDays, isWeekend} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedMonth: Date = new Date();
  calendarDays: Date[][] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar() {
    this.calendarDays = [];
    const firstDay = startOfMonth(this.selectedMonth);
    const lastDay = endOfMonth(this.selectedMonth);

    let currentWeek: Date[] = [];

    let currentDate = firstDay;

    // Находим первый будний день месяца
    while (isWeekend(currentDate)) {
      currentDate = addDays(currentDate, 1);
    }

    for (let i = 0; i < 5; i++) { // Создаем 5 недель
      for (let j = 0; j < 5; j++) { // Добавляем будние дни в неделю
        if (currentDate <= lastDay) {
          currentWeek.push(currentDate);
        }
        currentDate = addDays(currentDate, 1);
      }
      this.calendarDays.push([...currentWeek]);
      currentWeek = [];
    }
  }
  changeMonth(increment: number) {
    this.selectedMonth = increment > 0 ? addMonths(this.selectedMonth, 1) : subMonths(this.selectedMonth, 1);
    this.updateCalendar();
  }
}
