import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    BaseUrl = 'http://127.0.0.1:3000/';
    UsersUrl = 'http://127.0.0.1:3000/users'
    private token;
    user: User;
    isLogin = false;
    expiresIn = 120000;
    userChange = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {

    }
    get Token() {
        return this.token;
    }
    login(user) {
        this.http.post<User>(this.UsersUrl + '/login', user).subscribe(res => {
            this.token = res['token'];
            this.user = { email: res['user']['email'], id: res['user']['_id'] };
            // this.user.id = res['user']['_id'];
            this.isLogin = true;
            console.log(this.user);
            this.autoLogout();
            this.router.navigate(['']);
            this.userChange.next({ ...this.user });
        });

    }
    logout() {
        this.token = '';
        this.isLogin = false;
        this.user = null;
        this.userChange.next(null);

    }
    signUp(user) {
        this.http.post<User>(this.UsersUrl + '/signup', user).subscribe(res => {
            this.login(user);
        });
    }
    autoLogout() {
        setTimeout(() => {
            this.logout();
        }, this.expiresIn);
    }
}
export interface User {
    id: String,
    email: String,
    password?: String
}