import { Component,TemplateRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from "angularfire2/storage";
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataService } from '../data.service';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private storage:AngularFireStorage,
    private spinner: NgxSpinnerService, 
    private db: AngularFireDatabase,
    private router: Router, 
    public service: DataService,
    private modalService: BsModalService
    ) { }

  data : Observable<any>;
  users: Observable<any>;
  showEditOption:boolean = false;
  tag: string = "Write something to edit...";
  updateKey: string = null;

  modalRef: BsModalRef;
  pdfSrc: string;
  config = {
    animated: true
  };

  ngOnInit() {

    // show the spinner
    this.spinner.show();
    
    this.data = this.db.list('post/',ref => ref.limitToLast(50)).snapshotChanges().pipe(map(changes=>{
      if(changes.length !=0)
      return changes.map(c=>({
        key: c.payload.key,
        user: this.db.object("user/"+c.payload.val()['uid']).valueChanges(),
        ...c.payload.val()
      }));
      else this.router.navigate(['error']);
    }));


    // after loading all data, close spinner
    this.data.subscribe(e=>{
      if(e.length > 0){
        this.spinner.hide();
      }
    });
  }


  // show modal
  openModalWithClass(template: TemplateRef<any>,pdf:string) {
    this.pdfSrc = pdf;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  // delete post
  delete(key:string,uid:string,semester:string,course: string,file:string){
  this.db.list("post/"+key).remove();
  this.storage.ref("uploads/"+semester+"/").child(course.substr(0,3).toUpperCase()+"-"+course.substr(3,course.length).toUpperCase()+"/"+file).delete();
  }
  
  // delete post ends here

  // edit post
  edit(key: string, tagLine: string){
    this.showEditOption = true;
    this.tag = tagLine;
    this.updateKey = key;
  }
  post(){
    var temp = this.updateKey;
    if(this.updateKey){
      this.db.list("post/").update(this.updateKey,{tag: this.tag});
      this.showEditOption = !this.showEditOption;
    }
  }
  // cancel edit option 
  cancel(){
    this.showEditOption = !this.showEditOption;
  }
}
