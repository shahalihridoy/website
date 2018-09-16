import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};
  file: File = null;
  fileName: string = "Choose photo...";

  constructor(
    private afStorage: AngularFireStorage,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {

    // upload photo
    if (this.file == null)
      return;

    this.auth.emailSignUp(this.model.email, this.model.password);
    
    let path = "/userPhoto/" + this.file.name;

    this.afStorage.ref(path).put(this.file)
      .then(es => {
        const ref = this.afStorage.ref(path);
        ref.getDownloadURL().subscribe(url => {
          
          this.db.list('user/').set(this.auth.currentUserId,
            {
              "name":this.model.name,
              "photoUrl":url
            }
          ).then(e=>{
            // after successful data push
            this.auth.updateProfile(this.model.name,url);
            this.router.navigate(['/']);
          });
        });
      }).catch(e => { 
        // if file is not uploaded
        this.auth.currentUser.delete();
        this.afStorage.ref(path).delete();
        alert("Couldn't create account !!!") 
      });
  }

  getPhoto(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

}
