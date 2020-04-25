import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuardService} from './auth-guard.service';



export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
        canActivate: [AuthGuardService]



    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',

          },{
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            },

          {
              path: '',
              loadChildren: './articles/articles.module#ArticlesModule'
          },
          {
              path: '',
              loadChildren: './store/store.module#StoreModule'
          }

          ,  {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            },


            {      
                path: '',
                loadChildren: './media/media.module#MediaModule'},
  ],
        canActivate: [AuthGuardService]

    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
