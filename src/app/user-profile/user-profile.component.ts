import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	user: Observable<any>;
  post: Observable<any>;
  constructor(private router: ActivatedRoute, private db: AngularFireDatabase ) { }

  ngOnInit() {
    // getting uid from link
  	let uid = this.router.snapshot.params['id'];
    // getting user details
  	this.user = this.db.object('user/'+uid).valueChanges();
    // getting user uploaded files
    this.post = this.db.list("/post/" , ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }
}
