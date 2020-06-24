import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';


declare var $: any;
declare interface User {
    name: string,
    username: string,
    password: string,
    church: string,
    dbname: string
}

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    password;
    username;
    error;

    constructor(private element: ElementRef, private router: Router,
                private afAuth:AngularFireAuth,
                private spinner: NgxSpinnerService,
                private afs: AngularFirestore) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;


    }

    ngOnInit() {

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }






    private updateUserData(user) {
        const usersRef = this.afs.collection('users').doc(user.uid)

        usersRef.get().subscribe((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log("it exists")
                localStorage.setItem('role',"true")

            } else {
                const data = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,

                }
                // Sets user data to firestore on login
                this.afs.doc(`users/${user.uid}`).set(data,{merge:true}).then(r=> {
                    this.router.navigate(['/dashboard']);


                })
            }})




    }
    async doGoogleLogin() {
        const provider = new auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(provider).then(r=>{
            this.updateUserData(r.user);
        });
    }


}


