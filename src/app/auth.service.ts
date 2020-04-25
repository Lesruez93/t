import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static org_id;
  static church;
  static user_name;

  constructor(
      private afAuth:AngularFireAuth
  ) { }
}
