import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SwalService} from '../swal.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  save_disabled: any;
  title: any;
  description: any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: 'gs://my-pt-zim-fb13e.appspot.com',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }


  editing: any = false;
  adding: any;
  date: any;
  private uid: string;
  private tableData1: any;
  articles: any;
  private saving: boolean;
  private docId: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  sources: Array<Object>;
  private upload: any;
  private getCancelButton: boolean = true;
  private image: any;

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
afs.collection('Articles').valueChanges({idField:"docid"})
    .subscribe((res=>{
      this.articles = res
    }))     }
    }))


  }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'Date', 'Title', 'Author', ''],
      dataRows: []
    };


  }

  save() {
    console.log('Saving')
    this.spinner.show();
   //+/
    // ++this.s.deleted()

    this.afs.collection('Articles').add({
      title:this.title,
      uid:this.uid,
      date:this.date,
      image:this.image,
      content:this.description
    }).then(res=>{
      this.spinner.hide()
      this.title = ''
      this.description = ''
      this.date = ''
      this.image = ''
      this.getCancelButton = true
      this.uploadPercent = null
      this.upload.unsubscribe()

      // @ts-ignore
      document.getElementById('fUpload').value = null

      this.toast.showNotification('Article published','top','center','success','Success')
    }).catch(reason => {
      this.spinner.hide()
      this.toast.showNotification('Oops Something went wrong','top','center','danger','Failed')

    })
  }

  showEdit(article: any) {
    console.log(article)
    document.getElementById("title").focus();
    this.editing = true
    this.docId = article.docid
    this.title = article.title
    this.description = article.content
    this.date = article.date.toDate()
  }

  onDelete(id: any) {
    this.s.delete().then((result=>{
      if (result.value) {
        this.afs.collection('Articles').doc(id).delete().then((res=>{
          this.s.deleted()

        }))



      }else {
        this.s.cancelled()
      }

    }))
  }

  update() {
    this.afs.collection('Articles').doc(this.docId).update({
      title:this.title,
      uid:this.uid,
      date:this.date,
      content:this.description
    }).then((res=>{
      this.title = ''
      this.description = ''
      this.date = ''
      this.toast.showNotification('Article updated','top','center','success','Success')
      this.editing = false
    }))

  }

  uploadFile(event) {
    // take the filename from the file

    var fil = document.querySelector("#fUpload");
    // @ts-ignore

    if ( /\.(jpg|jpeg|svg|png)$/i.test(fil.files[0].name) === false )
    {
      this.toast.showNotification("Please upload a valid picture",'top','center','danger','Failed')
      // @ts-ignore
      document.getElementById('fUpload').value = null
    }

    else {


      const file = event.target.files[0];
      const filePath = this.makeid();
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      this.getCancelButton = false
      this.toast.showNotification("Featured image upload in progress..","top","center",'info','Uploading...');

      this.upload =  task.snapshotChanges().pipe(
          finalize(() =>
              {
                this.downloadURL = fileRef.getDownloadURL();
                fileRef.getDownloadURL().subscribe(x=>{console.log(x);
                  this.image = x;
                  this.save_disabled = false;
                  this.toast.showNotification('Upload Success','top','left','success','success')
                });
              }
          ))
          .subscribe()


    }





  }
  cancel(){
    this.uploadPercent = null
    this.upload.unsubscribe()

    // @ts-ignore
    document.getElementById('fUpload').value = null;

    this.getCancelButton = true

  }
  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  read(article: any) {
    
  }
}
