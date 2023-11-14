import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarComponent } from './home-page/calendar/calendar.component';
import { SideBarComponent } from './home-page/side-bar/side-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WindowWithInputComponent } from './home-page/side-bar/window-with-input/window-with-input.component';
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReleaseListComponent } from './home-page/side-bar/window-with-input/release-list/release-list.component';
import { NullContentComponent } from './home-page/side-bar/window-with-input/null-content/null-content.component';
import { FormsModule } from '@angular/forms';
import { NumericInputDirective } from './directives/numeric-input/numeric-input.directive';
import { ReleaseDetailsPageComponent } from './release-details-page/release-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SideBarComponent,
    HomePageComponent,
    WindowWithInputComponent,
    ReleaseListComponent,
    NullContentComponent,
    NumericInputDirective,
    ReleaseDetailsPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
