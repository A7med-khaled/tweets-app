import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(msg: string) {
    Swal.fire('Success', msg, 'success');
  }

  error(msg) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }
}
