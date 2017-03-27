import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../services/alert.service';

//import { Person } from '../models/person';

@Injectable()
export class AuthenticationService {
    
    public token: string;
    //public user : Person;
    
    constructor(private http: Http,private alertService   : AlertService) {
        // set token if saved in local storage
        var jwt = JSON.parse(localStorage.getItem('currentUser'));
        this.token = jwt && jwt.token;
        //this.user  = jwt && jwt.user;
    }

    login(url, person): Observable<boolean> {
        return this.http.post('/api/' + url + '/authenticate', person)
            .map((response: Response) => {
                if(!response.json().err){
                    localStorage.setItem('currentUser', JSON.stringify(response.json()));
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        //this.user  = null;
        this.alertService.error('you have now logged out, Please login again, if you wish', true);
        localStorage.removeItem('currentUser');
    }
}