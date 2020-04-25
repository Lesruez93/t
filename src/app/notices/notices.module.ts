import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NoticesComponent } from './notices.component';
import { NoticesRoutes } from './notices.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NoticesRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [NoticesComponent]
})
export class NoticesModule { }
