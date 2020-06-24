import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { MediaComponent } from './media.component';
import { MediaRoutes } from './media.routing';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {EditorModule} from '@tinymce/tinymce-angular';
import {NgxSummernoteModule} from 'ngx-summernote';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MediaRoutes),
        FormsModule,
        MaterialModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,

        EditorModule,
        NgxSummernoteModule
    ],
  declarations: [MediaComponent]
})
export class MediaModule { }
