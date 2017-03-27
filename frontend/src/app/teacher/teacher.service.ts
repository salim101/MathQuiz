import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable         } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import { Person  } from '../models/person';
import { Teacher } from './teacher';
import { Student } from '../student/student';
import { Quiz    } from './quiz';
import { Customcolour    } from './customcolour';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TeacherService {

  public teacher : Teacher;
  
  constructor(private http : Http, private authenticationService: AuthenticationService) {
    let jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.teacher = jwt && jwt.user;
  }

  register = (teacher : Teacher) : Observable<Response> => this.http.put('/api/teacher/register', teacher).map(res => res.json()).catch(err => Observable.throw(err.json().err || 'Server error'));

  registerStudent = (student : Student) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.put('/api/teacher/' + this.teacher['id'] + '/addstudent',student, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  publishQuiz = (quiz : Quiz) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.put('/api/teacher/' + this.teacher['id'] + '/quiz',quiz, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  insertCustomcolour = (customcolour : Customcolour) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.put('/api/teacher/' + this.teacher['id'] + '/insertcustomcolour',customcolour, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  updateCustomcolour = (customcolour : Customcolour) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/teacher/' + this.teacher['id'] + '/updatecustomcolour',customcolour, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  
  login = (url: string, teacher : Teacher) : Observable<boolean>  => this.authenticationService.login('teacher', teacher);

  logout = () => this.authenticationService.logout();

  deregister = () : Observable<Teacher> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.delete('/api/teacher/' + this.teacher['id'] + '/deregister', options).map(r => r.json());
  }

  update = (teacher : Teacher) : Observable<Teacher> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/teacher/' + this.teacher['id'] + '/update', teacher, options).map(r => r.json());
  }

  getTeacher = () : Observable<Teacher> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/profile', options).map(r => r.json());
  }

  getStudents = () : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/students', options).map(r => r.json());
  }

  countTotalStudentsByLevel = () : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/countstudents', options).map(r => r.json());
  }

  countTotalQuizzesByLevel = () : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/countquizzes', options).map(r => r.json());
  }

  countTotalQuizzesByClassLevel = (level: string) : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    let params: URLSearchParams = new URLSearchParams();
    params.set('level', level);
    options.search = params;
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/countquizzesoperators', options).map(r => r.json());
  }
  countTotalQuizzesAnsweredByClassLevel = (level: string) : Observable<Student[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    let params: URLSearchParams = new URLSearchParams();
    params.set('level', level);
    options.search = params;
    return this.http.get('/api/teacher/' + this.teacher['id'] + '/countquizzesansweredoperators', options).map(r => r.json());
  }

}