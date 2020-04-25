import {Routes} from '@angular/router';
import {ArticlesComponent} from './articles.component';

export const ArticleRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'articles',
        component: ArticlesComponent
    }]
}
];
