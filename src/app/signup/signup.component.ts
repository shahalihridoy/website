import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model:any = {};

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){

  }

  getPhoto(event){
    alert(event.target.files[0].name);
  }

}
