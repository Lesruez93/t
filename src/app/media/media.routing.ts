import { Routes } from '@angular/router';

import { MediaComponent } from './media.component';

export const MediaRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'lists/:id',
        component: MediaComponent
    }]
}
];
