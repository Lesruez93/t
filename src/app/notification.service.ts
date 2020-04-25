import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor() { }

  showNotification(message:string,from: any, align: any, type:any,title:any) {
    // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    var notify = $.notify({
      icon: 'notifications',
      message: message,
      title:title
    }, {
      type: type,
      timer: 500,
      allow_dismiss: true,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-6 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">check</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<h4 data-notify="message">{2}</h4>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
    });
  }

}
