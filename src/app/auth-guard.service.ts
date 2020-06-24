import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private redirectUrl: string;


  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

     this.auth.authState.subscribe(res=>{
      if (res && res.uid) {
          this.router.navigate(['/dashboard'])

      }
      else {
        this.redirectUrl = state.url;
        console.log("not logged in")
        this.router.navigate(['/login']);
        return false;
      }
    })
    return true;
  }
}
