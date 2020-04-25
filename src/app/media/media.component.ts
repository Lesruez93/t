import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationService} from '../notification.service';
import {SwalService} from '../swal.service';

declare var $: any;


declare var $: any;
declare interface TableData {
  headerRow: string[];

}

export interface TableData2 {
  headerRow: string[];

}

declare interface podcast {
     id:string;
     date:string;
     title:string;
     series:string;
     description:string;
     url:string;
}
declare interface Leader{
  id:string;
  name:string;
  url:string;
}

declare interface Series{
  id:string,
  title:string,
  description:string
}

declare interface Cms{
  livestream:string,
  playlist:string
}

declare interface Playlist{
     Name:string,
     Playlist:string
}



@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
    public tableData1: TableData;

    podcasts: Observable<any>;

    editing;
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


  public editing_podcast:podcast;

  apid;
  date;
 title;
  apseries;
  category;
  description;
  adding:boolean = true;
  public video:string = "http://static.videogular.com/assets/audios/videogular.mp3";

  save_disabled:boolean = true;
  leaders:Observable<any>;

  addingseries = false;
  cms:Cms = {livestream:"",playlist:""};
  org_id
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
  serieses:Observable<Series[]>;
  sources: Array<Object>;
    private upload: any;
    private getCancelButton: boolean = true;
    private trainer: any;
  constructor(private storage:AngularFireStorage,
              private notification:NotificationService,
              private db:AngularFirestore,
              private swalert:SwalService,
              public afAuth:AngularFireAuth){
    this.org_id = AuthService.org_id;
    
    afAuth.authState.subscribe((res=>{
        if(res&&res.uid){
            this.trainer = res.uid

        }
    }))


  }

  onfilter(id){
    this.category = id;
   // this.loadpodcasts();
  }

  loadpodcasts(){
    this.podcasts = this.db.collection(this.org_id+"/cms/series"+ this.category +"/audiofiles",
            ref => ref.orderBy('id', 'desc')).snapshotChanges()
                    .map(changes=>{
                        return changes.map(
                            a=>{
                            const data = a.payload.doc.data() as podcast;
                            data.id = a.payload.doc.id
                            return data
                            }
                        ) 
                        });
                        this.showAddNew();

  }

  onShowEdit(pod:podcast){
      this.adding = false;

      this.date = pod.date;
      this.title = pod.title;
      this.description = pod.description;
      this.video = pod.url;
      this.apid = pod.id;
  }
 
  ngOnInit() {
  //  this.getPlaylist();
      this.tableData1 = {
          headerRow: [ 'Date', 'Title', 'Description','Series']
       };
  }

  uploadFile(event) {
    // take the filename from the file

          var fil = document.querySelector("#fUpload");
      // @ts-ignore

      if ( /\.(m4v|mp4)$/i.test(fil.files[0].name) === false )
          {
              this.notification.showNotification("Format not supported please upload  Mp4 files only",'top','center','danger','Failed')
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
          this.notification.showNotification("Your file is being uploaded","top","center",'info','Uploading...');

          this.upload =  task.snapshotChanges().pipe(
                  finalize(() =>
                      {
                          this.downloadURL = fileRef.getDownloadURL();
                          fileRef.getDownloadURL().subscribe(x=>{console.log(x);
                              this.video = x;
                              this.save_disabled = false;
                              this.notification.showNotification('Upload Succes','top','left','success','success')
                          });
                      }
                  ))
                  .subscribe()


          }





  }
    cancel(){
      this.uploadPercent = null
        // @ts-ignore
        document.getElementById('fUpload').value = null;

        this.upload.unsubscribe()
        this.getCancelButton = true

    }
  save(){
    var Id = new Date().getTime() / 1000;
  
        var data = {
                    category:this.category,
                    date:this.date,
                    title:this.title,
                    video:this.video,
                    description:this.description,
                    trainer:this.trainer
                }

        this.db.collection("Programs").add(data)
        .then((x)=>{
          this.notification.showNotification("Success!","top","right",'success','Successful');
        });
        this.showAddNew()
        this.save_disabled = true;

  }

  showAddNew()
  {
    this.adding = true;
    this.date = "";
    this.title ="";
    this.description ="";
    this.video="";
    this.apid="";

    console.log(this.makeid());

  };

makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  

  onDelete(id:string){


    this.swalert.delete().then((result) => {
      if (result.value) {
        this.db.collection(this.org_id).doc("cms").collection('series')
            .doc("d48INFwsfXQM8xdjl4td").collection("audiofiles").doc(id).delete();
 
      this.swalert.deleted()

      } else {
        this.swalert.cancelled()
      }
    })
  

  }

  update(){
    var data = {
        date:this.date,
        title:this.title,
        series:this.category,
        description:this.description,
        url:this.video
    }
   this.db.collection(this.org_id).doc("cms").collection("series").doc("d48INFwsfXQM8xdjl4td").collection("audiofiles").doc(this.apid).update(data)
   .then(
     (x)=>{this.notification.showNotification("Updated!","top","right",'success','Successful')}
   );
  }

  onCancelEdit(){
    this.showAddNew();
  }

  onAddSeries(){
   
    this.addingseries = true;
  }
  onPostNewSeries(){
    console.log("posting series "+ this.category);
    var data = {
         title:this.apseries,
         desc:this.description    
    }
    this.db.collection(this.org_id).doc("cms").collection("series").add(data).then(
      x=>{
        console.log(x.id);
        this.category = x.id;
        this.addingseries = false;
       // this.loadpodcasts();
        this.notification.showNotification("Series Captured!","top","right",'success','Successful');
      }
    );
    
  }

  updatevids(){
    //this.db.collection(this.org_id).doc("cms").update(this.cms);
  }


playlist:Observable<any[]>;
    categories: any = ['Weight Lifting','Weight Loss' ];
getPlaylist() {
  
  this.playlist = this.db.collection(this.org_id+"/cms/playlists",ref => ref.orderBy('id', 'desc')).snapshotChanges()
  .map(changes => { 
        return changes.map(
            a=>{
                const data = a.payload.doc.data() as Playlist;       
                return data
              })
    })  
} 

}
