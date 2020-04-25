import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/firestore';

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

declare interface devotion {
  id: string ;
  date: String;
  title: String;
  author: String;
  message: String;
  scripture: String;
}



@Component({
  selector: 'app-devotions',
  templateUrl: './devotions.component.html',
  styleUrls: ['./devotions.component.scss']
})
export class DevotionsComponent implements OnInit {
  public tableData1: TableData;

  myForm: FormGroup;

  myEditForm: FormGroup;

  currentEditId;

  adding = true;
  org_id

  devotions: Observable<devotion[]>;

  constructor(private db: AngularFirestore, private fb: FormBuilder) {
               this.devotions = db.collection(this.org_id + '/cms/devotions', ref => ref.orderBy('id', 'desc')).snapshotChanges().map
                    (changes => {
                     return changes.map(
                       a => {
                        const data = a.payload.doc.data() as devotion;
                        data.id = a.payload.doc.id
                        return data
                       }
                     )
                    })  ;

                   this.showAddNew();
  }

    ngOnInit() {

        this.tableData1 = {
            headerRow: [ 'Date', 'Title', 'Author', ''],
            dataRows: []
         };

    }

  async submitHandler() {
      const id = new Date().getTime() / 1000;
      this.myForm.value.id = id;
       const formValue = this.myForm.value;
       try {
          await this.db.collection(this.org_id).doc('cms').collection('devotions').add(formValue)
          .then(
            x => {
              this.showNotification('Added!', 'top', 'right')
            }
          );
          this.showAddNew();

       } catch (err) {
           console.error(err);
       }
  }

  onDelete(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
  }).then((result) => {
    if (result.value) {
      this.db.collection(this.org_id).doc('cms').collection('devotions').doc(id).delete();
      swal({
          title: 'Deleted!',
          text: 'Your imaginary file has been deleted.',
          type: 'success',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
      }).catch(swal.noop)
    } else {
      swal({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
      }).catch(swal.noop)
    }
  })

 }

  showEdit(dev: devotion) {
    this.adding = false;
    this.myEditForm  = this.fb.group({
      date: dev.date,
      title: dev.title,
      author: dev.author,
      message: dev.message,
      scripture: dev.scripture
    });
    this.currentEditId = dev.id;

  }

  showAddNew() {
    this.adding = true;
    this.myForm  = this.fb.group({
      id: [''],
      date: ['', [
        Validators.required
      ]],
      title: ['', [
        Validators.required
      ]],
      author: ['', [
        Validators.required
      ]],
      message: ['', [
        Validators.required
      ]],
      scripture: ['', [
        Validators.required
      ]]
    });
  }

  onCancelEdit() {
    this.adding = true;

  }

  updateHandler() {
    this.db.collection(this.org_id).doc('cms').collection('devotions').doc(this.currentEditId).update(this.myEditForm.value)
    .then(x => { this.showNotification('updated!', 'top', 'right');
    this.showAddNew();
  });

  }

  showNotification(message: string, from: any, align: any) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    const notify = $.notify({
        icon: 'notifications',
        message: message,
        title: 'successful'
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
