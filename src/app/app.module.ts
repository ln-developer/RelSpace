import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './components/home/home.component';
import { WindowWithInputComponent } from './components/window-with-input/window-with-input.component';
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReleaseListComponent } from './components/release-list/release-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SideBarComponent,
    HomeComponent,
    WindowWithInputComponent,
    ReleaseListComponent
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
