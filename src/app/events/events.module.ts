import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { EventsComponent } from './events.component';
import { EventsRoutes } from './events.routing';
import { Angular5TimePickerModule } from 'angular5-time-picker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EventsRoutes),
    FormsModule,
    MaterialModule,
    Angular5TimePickerModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
