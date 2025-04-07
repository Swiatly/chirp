import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { RegisterData } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, username: string, password: string) {
        const authData: RegisterData = { email: email, username: username, password: password }
        this.http.post('http://localhost:3000/api/user/signup', authData)
            .subscribe(() => {
                this.router.navigate(['/']);
            }, error => {
                this.authStatusListener.next(false);
            });
    }
}