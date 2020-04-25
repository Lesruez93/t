import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {NgxSummernoteModule} from 'ngx-summernote';
import {StoreRoutes} from './store.routing';
import {StoreComponent} from './store.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StoreRoutes),
        FormsModule,
        MaterialModule,

        NgxSummernoteModule
    ],
  declarations: [StoreComponent]
})
export class StoreModule { }
