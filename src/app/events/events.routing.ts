import { Routes } from '@angular/router';

import { EventsComponent } from './events.component';

export const EventsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'events',
        component: EventsComponent
    }]
}
];