import { Routes } from '@angular/router';

import { DevotionsComponent } from './devotions.component';

export const DevotionsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'devotions',
        component: DevotionsComponent
    }]
}
];