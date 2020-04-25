import {Routes} from '@angular/router';
import {StoreComponent} from './store.component';

export const StoreRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'store',
        component: StoreComponent
    }]
}
];
