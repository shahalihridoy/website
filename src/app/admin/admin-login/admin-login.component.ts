import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
	user: string;
	pass: string;
	show: boolean = true;
	constructor(private db: AngularFireDatabase, private router: Router) { }

	ngOnInit() {
	}
	login(){
		try{
			this.show = false;
			let db = this.db.object("admin/"+this.user).valueChanges().subscribe(e=>{
				if(e.toString() == this.pass){
					this.router.navigate(['update-semester']);
				}
				else{
					this.show = false;
					alert("invalid username or password !");
				}
				
			});
		}
		catch(e){
			this.show = true;
			alert("invalid username or password !");
		}
	}

}
