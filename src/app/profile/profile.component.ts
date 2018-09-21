import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgModel } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

constructor(private router: ActivatedRoute, private db: AngularFireDatabase, public data: DataService ) { }
  name: string;
  reg: string;
  sem: string;
  contact: string;
  ngOnInit() {this.data.isLoggedIn();}

  // update user information
  update(){
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    this.reg = (<HTMLInputElement>document.getElementById("reg")).value;
    this.sem = (<HTMLInputElement>document.getElementById("sem")).value;
    this.contact = (<HTMLInputElement>document.getElementById("contact")).value;
    
      this.db.list("user/").update(this.data.getAuth().currentUser.uid,{
        name: this.name,
        reg: this.reg,
        semester: this.sem,
        contact: this.contact
      }).catch(e=>{console.log(e);
      }).then(e=>{window.alert("Update successful !!!")});
  }
}
