import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';
import { WindowWithInputComponent } from './components/window-with-input/window-with-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SideBarComponent,
    HomeComponent,
    WindowWithInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
