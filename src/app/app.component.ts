import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor( private router: Router,
               private afAuth:AngularFireAuth) {
    // afAuth.authState.subscribe(res=>{
    //   if (res && res.uid){
    //     console.log(res.uid+"   logged in")
    //  //   this.router.navigate(['/dashboard'])
    //   } else {
    //  //   this.router.navigate(['/login'])
    //   }
    // })
  }


    ngOnInit() {
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
    }
}
