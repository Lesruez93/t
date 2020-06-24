import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {GsService} from '../gs.service';
import * as firebase from 'firebase';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
    title: any;
    private cards: any;
  private docid: any;
  private editkey: any;
  private data: string;
  date: any;

  constructor(
              private db:AngularFirestore,
             // private g:GsService,
              private route: ActivatedRoute,
              private cdr:ChangeDetectorRef,
              public afAuth:AngularFireAuth) {
     
  }

    ngOnInit(): void {

      console.log()
      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').valueChanges({idField:'docid'}).subscribe(res=>{
        this.cards = res
      })
    }

    save() {
        this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
            .collection('cards').add({title:this.title})
    }

    delete(data: any,id) {
    this.assg(id)
      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[data.key]: firebase.firestore.FieldValue.delete()}}, {merge: true})
    }
    edit(data: any,id) {
      console.log(data)
      this.assg(id)
      this.editkey = data.key

      this.title = data.value.title
    }

    comment(t: any) {
        
    }

    done(title: any,id) {
      this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[title.key]:{status:"done"}}}, {merge: true})
    }

    update(title: any,id) {
    //this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[this.editkey]:{title:this.title}}}, {merge: true}).then(re=>{
            this.cdr.detectChanges()
      })
    }

    progress(title: any,id) {
      this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[title.key]:{status:"working"}}}, {merge: true})
    }

    notdone(title: any,id) {
      this.assg(id)

      this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
          .collection('cards').doc(this.docid).set({list:{[title.key]:{status:"notdone"}}}, {merge: true})
    }

    due(t: any,id) {
      this.assg(id)
      this.editkey = t.key
    }

    saveCard() {
      console.log(this.docid)
        this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
            .collection('cards').doc(this.docid).set({list:{[this.title]:{title:this.title,duedate:this.date}}}, {merge: true})
      }

    assg(c: any) {
        this.docid = c.docid
    }

  saveDate(title: any,id) {
   // this.assg(id)

    this.db.collection('tasks').doc(this.route.snapshot.paramMap.get('id'))
        .collection('cards').doc(this.docid).set({list:{[this.editkey]:{duedate:this.date}}}, {merge: true})
  }
}
