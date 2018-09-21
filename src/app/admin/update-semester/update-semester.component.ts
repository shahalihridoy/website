import { Component, OnInit, NgModule, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-update-semester',
	templateUrl: './update-semester.component.html',
	styleUrls: ['./update-semester.component.css']
})
export class UpdateSemesterComponent implements OnInit {
	course: Observable<{}> = null;
	courseList: Array<helper> = [];
	change: boolean = false;
	constructor(private db: AngularFireDatabase) { }
	cid: string;
	cname: string;
	semester: string;
	ngOnInit() {
	}

	// listing the course id based on semester selected
	getSemester(event){
			
			this.semester = event.target.value;
		if(event.target.value != ""){

			// course adding option will only show when a valid semester is selected
			// variable change is used for this
			this.change = true;
			this.course = this.db.object("semester/_"+this.semester.charAt(0)+this.semester.charAt(2))
			.valueChanges();
			this.course.subscribe(e=>{
				this.courseList = [];
				for(var i in e){
				// creating an object array of course id and course title
				this.courseList.push(new helper(i,e[i]));
			}
		});
		}
		else
			this.change = false;
	}

// updating existing course
	update(event){
		var x = (<HTMLInputElement>document.getElementById(event.target.id+"cid")).value;
		var y = (<HTMLInputElement>document.getElementById(event.target.id+"cname")).value;
		this.db.list("semester/_"+this.semester.charAt(0)+this.semester.charAt(2))
		.set(x,y).then(e=>{alert("successfully updated !")});
	}
	// deleting existing course
	delet(event){
		this.db.list("semester/_"+this.semester.charAt(0)+this.semester.charAt(2)+"/"+event.target.id)
		.remove();
		// this.getSemester(this.semester);
	}
	// adding new course to list
	addCourse(){
		if(this.change)
		this.db.list("semester/_"+this.semester.charAt(0)+this.semester.charAt(2)).set(this.cid,this.cname);
		this.cname = null;
		this.cid = null;
		// this.getSemester(this.semester);
	}
}


//this is how i can declare inner class without export
class helper{
	cid: string;
	cname: string;
	constructor(cid,cname){
		this.cid = cid;
		this.cname = cname;
	}
}