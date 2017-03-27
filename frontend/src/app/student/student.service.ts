import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions , URLSearchParams} from '@angular/http';
import { Observable         } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import { Person  } from '../models/person';
//import { Teacher } from './teacher';
//import { Student } from '../student/student';
import { Student } from './student';
import { Quiz    } from '../teacher/quiz';
import { Answers } from './answers';
import { Customcolour    } from '../teacher/customcolour';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class StudentService {

  public student : Student;
  
  constructor(private http : Http, private authenticationService: AuthenticationService) {
    let jwt = JSON.parse(localStorage.getItem('currentUser'));
    this.student = jwt && jwt.user;
  }

  
  login = (url: string, student : Student) : Observable<boolean>  => this.authenticationService.login('student', student);

  getQuizzes = (student: Student) : Observable<Quiz[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    
    let params: URLSearchParams = new URLSearchParams();
    params.set('level', this.student.level);
    params.set('teacherID', this.student.teacherID.toString());
    options.search = params;
    return this.http.get('/api/student/' + this.student['id'] + '/quizzes', options).map(r => r.json());
    
  }

  getQuizByID = (id: Number) : Observable<Quiz[]> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/student/'+id+'/quiz/', options).map(r => r.json());
  }

  getColours = (id) : Observable<Object> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/student/'+id+'/colour/', options).map(r => r.json());
  }

  publishAnswer = (answers : Answers) : Observable<Response> => {
    let headers = new Headers({Authorization: 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});
    return this.http.put('/api/student/' + this.student['id'] + '/answers',answers, options).map(r => r.json()).catch(err => Observable.throw(err.json().err || 'Server error'));
  }

  logout = () => this.authenticationService.logout();

  getSetting = (id)  => {
    let colours : Object;
    this.getColours(id)
        .subscribe(colours => {
          if(colours){
            colours = colours;
            let backgroundColour = colours['backgroundColour'];
            let fontSize = colours['fontSize'];
            for(let elements = document.getElementsByTagName('div'), i = elements.length; i--;){
                elements[i].style.backgroundColor=backgroundColour;
                elements[i].style.fontSize=fontSize;
            }
          }
        });
  }

}