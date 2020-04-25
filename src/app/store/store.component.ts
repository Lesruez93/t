import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  private uid: string;
  private products: any;

  constructor(private afs:AngularFirestore,
              private toast:NotificationService,
              private spinner:NgxSpinnerService,
              private s:SwalService,
              private storage:AngularFireStorage,
              private afAuth:AngularFireAuth)
  {

    afAuth.authState.subscribe((res=>{
      if (res&&res.uid){
        this.uid = res.uid
        afs.collection('Products').valueChanges({idField:"docid"})
            .subscribe((res=>{
              this.products = res
            }))     }
    }))


  }
  ngOnInit() {
  }

}
