import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';

declare var $: any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface TableWithCheckboxes {
    id?: number;
    ischecked?: boolean;
    product_name: string;
    type: string;
    quantity: number;
    price: any;
    amount: string;
}

declare interface event {
    id:string,
    description:string,
    message:string, 
    name:string, 
    timestamp:string, 
    venue:string, 
    type:string,
    startdate:string,
    starttime:string,
    endtime:string,
    enddate:string,
}

export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public tableData1: TableData;

  public regions = ['Local','Regional','National']

  adding:boolean = true;
  currentEditId;

  myForm:FormGroup;

  starttime;

  org_id;

  myEditForm:FormGroup;

  region = "Local";

  events:Observable<any[]>;

  constructor(private db:AngularFirestore, private fb:FormBuilder){
     this.org_id = AuthService.org_id;
     this.populateEvents();
     this.showAddNew();
      }
     ngOnInit() {

        this.tableData1 = {
            headerRow: ['Event Name','Description', 'Starts', 'Ends', 'Venue','Region'],
            dataRows: [ ]
         };



    }

  populateEvents(){
    this.events = this.db.collection(this.org_id+"/cms/events/Events/"+this.region,ref => ref.orderBy('id', 'desc')).snapshotChanges()
    .map(changes=>{
      return changes.map(
          a=>{
          const data = a.payload.doc.data() as event;
          data.id = a.payload.doc.id
          return data
          }
      ) 
      });
  }
    
  showEdit(evt:event){
    this.adding = false;
    this.myEditForm = this.fb.group({
        name:evt.name,
        message:evt.message,
        description:evt.description,
        venue:evt.venue,
        startdate:evt.startdate,
        starttime:evt.starttime,
        endtime:evt.endtime,
        enddate:evt.enddate,
    })
    this.currentEditId = evt.id;
  }

  onChange($event){
    console.log("changed");
    this.populateEvents();
  }

  

  showAddNew(){
    this.adding = true;

    this.myForm  = this.fb.group({
      id:[""],
      description:['',[
        Validators.required
      ]],
      message:['',[
        Validators.required
      ]],  
      name:['',[
        Validators.required
      ]], 
      venue:['',[
        Validators.required
      ]], 
      startdate:['',[
        Validators.required
      ]],
      starttime:'',
      endtime:'',
      enddate:['',[
        Validators.required
      ]],
    });
  }

  async submitHandler(){
    var id = new Date().getTime() / 1000;
    this.myForm.value.id = id;
    const formValue = this.myForm.value;
    try{
      console.log(this.starttime);
       await this.db.collection(this.org_id+"/cms/events/Events/"+this.region).add(formValue)
       .then(x=>{ this.showNotification("Added","top","right")});
       this.showAddNew();
    }catch(err){
        console.error(err);
    }
}

  onCancelEdit(){
    this.showAddNew();
  }

  updateHandler(){
    this.db.collection(this.org_id).doc("cms").collection('events').doc(this.currentEditId).update(this.myEditForm.value)
    .then(x=>{this.showNotification("Updated!..","top","right")});
    this.showAddNew();
  }

  onDelete(id:string){
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.db.collection(this.org_id).doc("cms").collection('events').doc("Events").collection(this.region).doc(id).delete();
  
      swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
        }).catch(swal.noop)
      } else {
        swal({
            title: 'Cancelled',
            text: 'Your  file is safe :)',
            type: 'error',
            confirmButtonClass: "btn btn-info",
            buttonsStyling: false
        }).catch(swal.noop)
      }
    })
  }

  showNotification(message:string,from: any, align: any) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    var notify = $.notify({
        icon: 'notifications',
        message: message,
        title:'successful'
    }, {
        type: 'success',
        timer: 500,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">check</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<h3 data-notify="message">{2}</h3>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    }); }


}
