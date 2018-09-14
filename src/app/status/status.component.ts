import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import * as firebase from 'firebase';
import { DataService } from '../data.service'
import { AuthService } from "../auth.service";
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  test = null;
  semester: string = null;
  course: string = null;
  file: File[] = [];
  tag: string = null;
  codes: Observable<{}>;
  dbs: Observable<{}>;
  code: string[] = [];
  url: string = null;
  progress: number = 0;
  fileName: string;
  task: AngularFireUploadTask;
  constructor(private afStorage: AngularFireStorage, public auth: AuthService, public data: DataService, private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  getFile(event) {
    if (event.target.files.length == 0) {
      return;
    }
    this.file = []; //empty the array

    for (var i = 0; i < event.target.files.length; i++) {
      this.file.push(event.target.files[i]);
    }
  }
  getSemester(event) {
    this.semester = null;
    this.code = [];
    this.semester = "_" + event.target.value.charAt(0) + event.target.value.charAt(2);
    this.codes = this.db.object("semester/" + this.semester).valueChanges();
    this.codes.subscribe(e => {
      for (var i in e)
        this.code.push(i);
    })
  }
  getCode(event) {
    this.course = event.target.value;
  }


  post() {

    this.url = null;
    let file = this.file;
    let semester = this.semester;
    let course = this.course;
    let tag = this.tag;


    if (file.length != 0 && semester != null && course != null) {

      // ===> Multiple file upload <===

      for (let e of this.file) {

        this.progress = 0;
        this.fileName = "Couldn't Upload File";
        if (e.size > 150 * 1024 * 1024) {
          alert("Maximum file size is 75MB");
          continue;
        }



        // upload and grab url

        this.task = this.afStorage.ref("/uploads/" + this.semester + "/" + this.course + "/" + e.name).put(e);

        this.task.percentageChanges().subscribe(e => { this.progress = +e.toFixed(0) });

        this.task.then(es => {
          const ref = this.afStorage.ref("/uploads/" + this.semester + "/" + this.course + "/" + e.name);
          ref.getDownloadURL().subscribe(url => {
            this.getUrl(url,e.name,(e.size>(1024*1024))?((e.size/1024/1024).toFixed(2).toString()+" MB"):((e.size/1024).toFixed(2).toString()+" KB"));
          });
        });

      }
    }
  }

  getUrl(url: string, name: string, size: string) {
    let date = new Date();

    if (url == undefined)
      return;

    this.db.list('/post').push({
      "uid": this.auth.currentUserId,
      "semester": this.semester,
      "course": this.course.substr(0, 3).toLowerCase() + this.course.substr(4, this.course.length).toLowerCase(),
      "tag": this.tag,
      "file": url,
      'fileName': name,
      'fileSize': size,
      "date": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    }).then(e => {
    });
  }

}
