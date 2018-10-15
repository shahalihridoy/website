import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data: DataService;
  term:string;

  constructor(public auth:AuthService,private router:Router,data: DataService) { 
    this.data = data;
    if(data._11.length == 0){
      data.getDropDownMenuData();
    }
  }

  ngOnInit() {
  }

  showAside(){
    this.data.drawerWidth = 1;
    this.data.showAside = !this.data.showAside;
  }

  search(event){
    if(event.keyCode == 13){
      this.router.navigate(['/search/'+this.term]);
    }
  }
}
