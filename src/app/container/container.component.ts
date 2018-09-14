import { Component, TemplateRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from "angularfire2/storage";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DataService } from '../data.service';
import { AuthService } from "../auth.service";
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private storage:AngularFireStorage,
    private route:ActivatedRoute,
    private spinner: NgxSpinnerService, 
    private db: AngularFireDatabase,
    private router: Router, 
    public service: DataService,    
    public auth: AuthService,
    private modalService: BsModalService) { }

    modalRef: BsModalRef;
    pdfSrc: string;
    config = {
      animated: true
    };


  data : Observable<any>;
  users: Observable<any>;
  showEditOption:boolean = false;
  tag: string = "Write something to edit...";
  updateKey: string = null;
  ngOnInit() {

    this.route.params.subscribe(params=>{

      // show the spinner
      this.spinner.show();

      const id = params['id'];
      
      this.data = this.db.list('/post/', ref => ref.orderByChild('course').equalTo(id.substr(0,3).toLowerCase()+id.substr(4,id.length).toLowerCase())).snapshotChanges().pipe(map(changes=>{
        
        if(changes.length != 0)
        return changes.map(c=>({
          key: c.payload.key,
          user: this.db.object("user/"+c.payload.val()['uid']).valueChanges(),
          ...c.payload.val()
        }));

        else {
          this.spinner.hide();
          // this.router.navigate(['error']);
        }

      }));
  
  
      // after loading all data, close spinner
      this.data.subscribe(e=>{

        if (e != undefined) {
          if(e.length > 0){
            this.spinner.hide();
          }
        }
      });

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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  // delete post
  delete(key:string,uid:string,semester:string,course: string,file:string){
  this.db.list("/post/"+key).remove();
  this.storage.ref("/uploads/"+semester+"/").child(course.substr(0,3).toUpperCase()+"-"+course.substr(3,course.length).toUpperCase()+"/"+file).delete();
  }


  // edit post
  edit(key: string, tagLine: string){
    this.showEditOption = !this.showEditOption;
    this.tag = tagLine;
    this.updateKey = key;
  }

  post(){
    var temp = this.updateKey;
    if(this.updateKey){
      this.db.list("post/").update(this.updateKey,{tag: this.tag});
      this.showEditOption = !this.showEditOption;
    }

    this.modalRef.hide();
  }

  // cancel edit option 
  cancel(){
    this.showEditOption = !this.showEditOption;
  }

  // close window
  close(){
    this.modalRef.hide();
  }
}
