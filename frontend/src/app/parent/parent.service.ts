import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable         } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Parent } from './parent';
import { Student } from '../student/student';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ParentService {

  public parent : Parent;
  
  constructor(private http : Http, private authenticationService: AuthenticationService) {
    let jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.parent = jwt && jwt.user;
  }

  register = (parent : Parent) : Observable<Response> => this.http.put('/api/parent/register', parent).map(res => res.json()).catch(err => Observable.throw(err.json().err || 'Server error'));

  
  login = (url: string, parent : Parent) : Observable<boolean>  => this.authenticationService.login('parent', parent);

  logout = () => this.authenticationService.logout();


  addChild = (studentid : String) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/parent/' + this.parent['id'] + '/addchild',studentid, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  getChilds = () : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/parent/' + this.parent['id'] + '/childs', options).map(r => r.json());
  }

  countTotalAssignedQuizzes = (studentid: string) : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    let params: URLSearchParams = new URLSearchParams();
    params.set('studentid', studentid);
    options.search = params;
    return this.http.get('/api/parent/' + this.parent['id'] + '/countassignedquizzes', options).map(r => r.json());
  }

  countTotalAnsweredQuizzes = (studentid: string) : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    let params: URLSearchParams = new URLSearchParams();
    params.set('studentid', studentid);
    options.search = params;
    return this.http.get('/api/parent/' + this.parent['id'] + '/countansweredquizzes', options).map(r => r.json());
  }


 

}