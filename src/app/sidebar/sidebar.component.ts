import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  data: DataService
  showSubject: boolean = false;
  semesterName: string = null;

  constructor(data:DataService) {
    this.data = data;
   }

  ngOnInit() {
  }

  addSubjectCode(event){

    // hide semester page
    event.target.parentElement.style.display = "none";

    // show subject code
    this.semesterName = event.target.innerHTML;
    this.showSubject = true;

    switch (event.target.id) {
      case "11":
      this.data.temp = this.data._11;
      break;
      case "12":
      this.data.temp = this.data._12;
      break;
      case "21":
      this.data.temp = this.data._21;
      break;
      case "22":
      this.data.temp = this.data._22;
      break;
      case "31":
      this.data.temp = this.data._31;
      break;
      case "32":
      this.data.temp = this.data._32;
      break;
      case "41":
      this.data.temp = this.data._41;
      break;
      case "42":
      this.data.temp = this.data._42;
      break;
      default:
        break;
      }
  }

  hideMenu(event){
    this.data.showAside = false;
  }
}
