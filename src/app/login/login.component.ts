import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(event){
    let button_id = (event.target as Element);
    switch (button_id.id) {
      case "submit":
        this.auth.emailLogin(this.email,this.password);
        break;
        case "f":
        this.auth.facebookLogin();
        console.log(this.auth.currentUserDisplayName);
        break;
        case "g":
        this.auth.googleLogin();
        break;
        case "t":
        this.auth.twitterLogin();
        break;
        case "fp":
        this.auth.resetPassword(this.email);
        break;
      default:
        break;
    }
  }

}
