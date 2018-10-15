import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Food Engineering & Tea Technology';
  data: DataService;
  constructor( data : DataService ){
    this.data = data;
  setTheme('bs4');
  }

  hideMenu(){
    this.data.drawerWidth = 0;
    this.data.showAside = false;
  }
}
