import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {GsService} from '../gs.service';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    // google maps zoom level
    polygon: any;




    private logged: boolean;
    private cdata: any;
    private users: any;
    title: any;

    private tasks: any;
    private taskk: any;
    private role: any;

    constructor(
        private  af:AngularFirestore,
        private afs:AngularFireAuth,
        private router:Router,
        private gs:GsService,
    )
    {




        //   this.dataRef = db.object('VehicleInfo');

// this.af.collection('users',)).valueChanges().subscribe((res:any)=>{
//     console.log(res)
//
//     this.users = res
// })

    }


    nav(){
        //this.afs.auth.signOut();

        this.router.navigate(['/login'])

    }

    navHome(){

        this.afs.authState.subscribe(res => {


            if (res && res.uid) {
                this.logged = true
                this.router.navigate(['/'])

            }
            else {
                this.logged = false

                alert('Please Login');
                this.nav();

            }

        })}





    ngOnInit(): void {

this.afs.authState.subscribe((res:any)=>{

    this.af.collection('users').doc(res.uid).valueChanges()
        .subscribe((res:any)=>{
            this.role = res.role
            if (res.role == 'admin'){
                this.afs.authState.subscribe(res => {
                    this.af.collection('tasks')
                        .valueChanges({idField:'docid'}).subscribe(res=>{
                        this.tasks = res
                    })



                });
            } else {
                this.afs.authState.subscribe(res => {
                    this.af.collection('tasks',ref => ref.where('uid','==',this.afs.auth.currentUser.uid))
                        .valueChanges({idField:'docid'}).subscribe(res=>{
                        this.tasks = res
                    })



                });
            }
        })
})


    }



    addNew() {

    }

    alert(edit: string) {
        alert(edit)
    }

    delete(id) {
        this.af.collection('tasks').doc(id.docid).delete()
    }

    save() {
        let data =
            {
                title:this.title,
                date: moment().format('YYYY-MM-DD HH:mm:s'),
                name:this.afs.auth.currentUser.displayName,
                uid:this.afs.auth.currentUser.uid,
                id:Date.now()
            }
        this.af.collection('tasks').add(data).then(res=>{
            this.title = ' '
        })
    }

    update(id) {
        let data =
            {
                title:this.title,
                name:this.afs.auth.currentUser.displayName,
            }

        this.af.collection('tasks').doc(id.docid).update(data).then(res=>{
            this.title = ' '
        })
    }

    edit(task: any) {
        this.taskk = task
        this.title = task.title
    }

    navTocards(data) {
        this.gs.setParams(data)
        this.router.navigateByUrl(`lists/${data.docid}`,data.docid)

    }
}
