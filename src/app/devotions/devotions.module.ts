import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { DevotionsComponent } from './devotions.component';
import { DevotionsRoutes } from './devotions.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DevotionsRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [DevotionsComponent],
})
export class DevotionsModule { }
