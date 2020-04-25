import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';
declare var $: any;

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
export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}

declare interface Notice {
    id:string,
    date:string,
    message:string,
    name:string,
    notice:string,
    timestamp:string
} 


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {

  public tableData1: TableData;

  notices:Observable<Notice[]>;

  myForm:FormGroup;

  myEditForm:FormGroup;
 
  currentEditId;
  org_id;
  
  adding:boolean = true;

  constructor(private db:AngularFirestore, private fb:FormBuilder){
     //this.notices = db.collection('notices').valueChanges();
     this.org_id = AuthService.org_id;

     this.notices = db.collection(this.org_id+"/cms/notices",ref => ref.orderBy('id', 'desc')).snapshotChanges().map
                (changes=>{
                return changes.map(
                    a=>{
                    const data = a.payload.doc.data() as Notice;
                    data.id = a.payload.doc.id
                    return data
                    }
                ) 
                });
                this.myForm  = this.fb.group({
                    date:['',[
                      Validators.required
                    ]],
                    name:['',[
                      Validators.required
                    ]],
                    notice:['',[
                      Validators.required
                    ]],
                    message:['',[
                      Validators.required
                    ]]
                  });
             
  }
 
  ngOnInit() {

      this.tableData1 = {
          headerRow: [ 'Date', 'Title', 'From',''],
          dataRows: []
       };

  }
  getTotal() {
      let total = 0;
      for (let i = 0; i < this.tableData1.dataRows.length; i++) {
          const integer = parseInt(this.tableData1.dataRows[i][8], 10);
          total += integer;
      }
      return total;
  };

  showEdit(ntc:Notice){
    this.adding = false;
    this.myEditForm = this.fb.group({
        name:ntc.name,
        date:ntc.date,
        message:ntc.message,
        notice:ntc.notice
    })
    this.currentEditId = ntc.id;
  
   
  }

  showAddNew(){
    this.adding = true;

    this.myForm  = this.fb.group({
      id:[""],
        date:['',[
          Validators.required
        ]],
        name:['',[
          Validators.required
        ]],
        notice:['',[
          Validators.required
        ]],
        message:['',[
          Validators.required
        ]]
      });
  
  }

  async submitHandler(){
    var id = new Date().getTime() / 1000;
    this.myForm.value.id = id;
    const formValue = this.myForm.value;
    try{
       await this.db.collection(this.org_id).doc("cms").collection('notices').add(formValue)
       .then(x=>{this.showNotification("Notice posted!","top","right")})
       this.showAddNew();
    }catch(err){
        console.error(err);
    }
}

  onCancelEdit(){
    this.adding = true;
  }

  updateHandler(){
    this.db.collection(this.org_id).doc("cms").collection('notices').doc(this.currentEditId).update(this.myEditForm.value)
    .then(x=>{this.showNotification("Updated!","top","right");
    this.showAddNew();
  });
  }

  onDelete(id:string){
    this.db.collection(this.org_id).doc("cms").collection('notices').doc(id).delete();
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
    }); 
}
  

}
