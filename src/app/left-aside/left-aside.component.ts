import { Component, OnInit } from '@angular/core';
import { Router,Route } from '@angular/router';




@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.css']
})
export class LeftAsideComponent implements OnInit {

  term:string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(event){
    if(event.keyCode == 13){
      this.router.navigate(['/search/'+this.term]);
    }
  }
}
