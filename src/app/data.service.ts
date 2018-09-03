import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { Helper } from './shared/helper'
import { Post } from './shared/post';

@Injectable()
export class DataService {

  _11: Helper[]= [];
  _12: Helper[]= [];
  _21: Helper[]= [];
  _22: Helper[]= [];
  _31: Helper[]= [];
  _32: Helper[]= [];
  _41: Helper[]= [];
  _42: Helper[]= [];

  semester: Observable<{}> = null;
  loginStatus: Observable<firebase.User>;
  log: boolean;
  a: string;
  loggedUser: Observable<any> = null;
  signedUser: {} = null;
  
  constructor(private router: Router, private db: AngularFireDatabase, private authUser: AngularFireAuth) {
  }

  // sign(up)
  getAuth() {
    return this.authUser.auth;
  }

  isLoggedIn() {
    this.loginStatus = this.authUser.authState;
    this.authUser.authState.subscribe(e => {
      if (e) {
        // getting details of a logged user
        this.loggedUser = this.db.object('user/' + e.uid).valueChanges();
      }
    });
  }
  getLoginStatus(): any {
    var user = firebase.auth().currentUser;
    if (user) {
      this.log = firebase.auth().currentUser.emailVerified;
      return user.uid;
    } else {
       this.log = false;
      return null;
    }

  }
  // userListing starts here for setHeaders

  // load drop down for header 
  getDropDownMenuData() {

    this.isLoggedIn(); //get login status

    this.semester = this.db.object('semester').valueChanges();
    this.semester.subscribe(e => {
        this._11=[];
        this._12=[];
        this._21=[];
        this._22=[];
        this._31=[];
        this._32=[];
        this._41=[];
        this._42=[];
      for(var i in e){
        for(var x in e[i]){
          switch(i){
            case "_11": this.setHelper(this._11,x,e[i][x]);
            break;
            case "_12": this.setHelper(this._12,x,e[i][x]);
            break;
            case "_21": this.setHelper(this._21,x,e[i][x]);
            break;
            case "_22": this.setHelper(this._22,x,e[i][x]);
            break;
            case "_31": this.setHelper(this._31,x,e[i][x]);
            break;
            case "_32": this.setHelper(this._32,x,e[i][x]);
            break;
            case "_41": this.setHelper(this._41,x,e[i][x]);
            break;
            case "_42": this.setHelper(this._42,x,e[i][x]);
            break;
          }
        }
      }
    });
  }
  setHelper(sem:Helper[],x:string,y:string){
    sem.push(new Helper(x.substr(0,3).toUpperCase()+"-"+ x.substr(3, x.length).toUpperCase(), y));
  }
}

