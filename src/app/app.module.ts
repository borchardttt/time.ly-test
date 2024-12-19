import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, CalendarComponent, MainLayoutComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
