import { Routes } from '@angular/router';
import {ListsComponent} from './lists.component';


export const ListsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'lists/:id',
        component: ListsComponent
    }]
}
];
