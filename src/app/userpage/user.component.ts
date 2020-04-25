import { Component } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent {
    private user: any = {};
    private uid: string;
    bio: any;

    constructor( private afs:AngularFirestore,
                 private afAuth:AngularFireAuth,
                 private notification:NotificationService,
                 private spinner:NgxSpinnerService
                 ){


        this.afAuth.authState.subscribe((res=>{
            if (res&&res.uid){
                this.uid = res.uid
                this.afs.collection('Users/clients/users').doc('SsHjnyVBn1SrjgwDDy0o').valueChanges()
                    .subscribe((res=>{
console.log(res)
                        this.user = res

                    }))            }
        }))
    }



    update(){
        console.log(this.user)
        this.spinner.show()
        this.afs.collection('Users/clients/users').doc('SsHjnyVBn1SrjgwDDy0o').update(this.user
        ).then((res=>{
            this.spinner.hide()
            this.notification.showNotification('Profile updated','top','center','success',"Success")
        })).catch((reason => {
            this.notification.showNotification('Profile updated failed Please Try Again','top','center','danger',"Failed")
this.spinner.hide()
        }))
    }

}



