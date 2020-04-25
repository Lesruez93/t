import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../auth.service';
import { Router} from "@angular/router";

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{




        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },

    //    {
    //     path: '',
    //     title: 'Content',
    //     type: 'sub',
    //     icontype: 'apps',
    //     collapse: 'components',
    //     children: [
    //         {path: 'devotions', title: 'Devotions', ab:'D'},
    //         {path: 'notices', title: 'Notices', ab:'N'}
    //     ]
    // },{
    //     path: '/media',
    //     title: 'Media',
    //     type: 'link',
    //     icontype: 'content_paste',
    //
    // },

    {
        path: '/media' ,
        title: 'Programs',
        type: 'link',
        icontype: 'fitness_center'

    },


    {
        path: '/store' ,
        title: 'Supplements',
        type: 'link',
        icontype: 'store'

    }


    ,
    {
        path: '/articles' ,
        title: 'Articles',
        type: 'link',
        icontype: 'import_contacts'

    }

    // {
    //     path: '/tables',
    //     title: 'Fundraising',
    //     type: 'sub',
    //     icontype: 'grid_on',
    //     collapse: 'tables',
    //     children: [
    //         {path: 'regular', title: 'Projects', ab:'RT'},
    //         {path: 'extended', title: 'Pledges', ab:'ET'},
          
    //     ]
    // },
    // {
    //     path: '/charts',
    //     title: 'Testimonies',
    //     type: 'link',
    //     icontype: 'timeline'

    // },{
    //     path: '/calendar',
    //     title: 'Cellgroups',
    //     type: 'link',
    //     icontype: 'date_range'
    // }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    churchname;
    username;
    constructor(private auth:AuthService,private router: Router){

    }

    logout(){
        this.router.navigate(['../../../login']);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };


    
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
