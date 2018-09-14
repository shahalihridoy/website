import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-right-aside',
  templateUrl: './right-aside.component.html',
  styleUrls: ['./right-aside.component.css']
})
export class RightAsideComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

}
