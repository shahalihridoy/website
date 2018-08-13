import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftAsideComponent } from './left-aside/left-aside.component';
import { RightAsideComponent } from './right-aside/right-aside.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'}
  // { path: 'edit-profile', component: ProfileComponent, pathMatch: 'full'},
  // { path: 'admin', component: AdminLoginComponent, pathMatch: 'full'},
  // { path: 'update-semester', component: UpdateSemesterComponent, pathMatch: 'full'},
  // { path: 'upload', canActivate: [AuthGuard], component: StatusComponent, pathMatch: 'full'},
  // { path: 'error', component: ErrorComponent, pathMatch: 'full'},
  // { path: 'user/:id', component: UserProfileComponent, pathMatch: 'full'},
  // { path: ':id', component: ContainerComponent, pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftAsideComponent,
    RightAsideComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],

  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
