import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesRoutes} from './pages.routing';


import {LoginComponent} from './login/login.component';


// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
  declarations: [
    LoginComponent,

  ]
})

export class PagesModule {}
