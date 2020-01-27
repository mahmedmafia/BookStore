import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  openav = false;
  loggedUser: User;
  isLogin;
  constructor(private authServ: AuthService) { }

  ngOnInit() {
    this.authServ.userChange.subscribe(user => {
      if (user == null) {
        this.loggedUser = null;
        this.isLogin = false;
      } else {
        this.loggedUser = user;
        this.isLogin = true;
      }
    }, err => {
      console.log('err' + err);
    });
  }
  onLogout() {
    this.authServ.logout();
  }

}
