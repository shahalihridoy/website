import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data: DataService;
  constructor(data: DataService) { 
    this.data = data;
    if(data._11.length == 0){
      data.getDropDownMenuData();
    }
  }

  ngOnInit() {
  }

  test() {
    console.log(this.data._11[0].c_code);
  }

}
