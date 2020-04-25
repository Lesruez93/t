import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() {

  }


  cancelled(){

    return swal({
      title: 'Cancelled',
      text: 'Operation Cancelled)',
      type: 'error',
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false
    }).catch(swal.noop)
  }



  deleted(){
    return       swal({
      title: 'Deleted!',
      text: 'Your file has been deleted',
      type: 'success',
      confirmButtonClass: "btn btn-success",
      buttonsStyling: false
    }).catch(swal.noop)

  }


    delete (){


   return swal({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete !',
      cancelButtonText: 'No, ',
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    })
  }


}
