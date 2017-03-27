import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router              } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,
         Validators, FormBuilder      } from '@angular/forms';

import { Answers } from './answers';
import {Observable} from 'rxjs/Rx';

import { Student               } from '../student/student';
import { StudentService        } from '../student/student.service';

@Component ({
    template: `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" (click)="toggleState()">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>   
                </div>
                <div class="collapse navbar-collapse" [ngClass]="{ 'in': isIn }">
                    <ul class="nav navbar-nav">
                        <li><a routerLink="/student/{{student.id}}/home" routerLinkActive="active">Welcome Page</a></li>
                        <li class="active"><a routerLink="/student/{{student.id}}/quizzes" routerLinkActive="active">My Assigned Quizzes</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a ><span class="glyphicon glyphicon-user"></span>{{student.firstName}}</a></li>
                        <li><a routerLink="/student/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Bye</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h3 class="text-center">Quiz Questions</h3>
                </div>
                Timer {{answeredTime.hours}}:{{answeredTime.minutes}}:{{answeredTime.seconds}}
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h5>Please answer each of the quiz questions</h5>
                </div>  
            </div>

            <form #form="ngForm">
                <div *ngFor="let question of this.quiz"><br>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-md-2 col-sm-offset-4" >
                            {{question.num1}} {{question.operator}} {{question.num2}} =
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-md-2">
                            <input name="q{{question.id}}" type="number" class="form-control" placeholder="your answer" ngModel required>
                        </div>
                    </div>
                </div>
                <div class="row"><br>
                    <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                        <button type="button" [disabled]="!form.valid" class="btn btn-primary btn-lg btn-block" routerLinkActive="active"(click)="submitAns(form.value)">SUBMIT</button>
                    </div>
                </div>
             </form>

            

        </div>
    `,
  styles:[`
    div{font-family: "Comic Sans MS";}
  `
  ]
})
export class StudentQuizComponent implements OnInit {

    private isIn    : boolean = false;
    private quizID  : number;
    private sub     : any;
    private student : Student = new Student();
    private quiz    : Object[];
    private form    : FormGroup;
    private answers : Answers = new Answers();
    private time : number;
   
    private one :number =0;
    private two :number =0;
    private three :number =0;

    private answeredTime : Object = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    constructor(private route: ActivatedRoute,
                private fb   : FormBuilder,
                private router : Router,
                private studentService: StudentService) {
                if(this.studentService.student)
                    this.student = this.studentService.student;
    }

    timer() {
        let timer = Observable.interval(1000);
        timer.subscribe(t => {
            let d = new Date(t * 1000);
            this.answeredTime['hours']   = d.getHours();
            this.answeredTime['minutes'] = d.getMinutes();
            this.answeredTime['seconds'] = d.getSeconds();
        });
    }


    submitAns(answer) {
        this.answers.answers(this.quizID,this.student.id,answer.q1,answer.q2,answer.q3,this.answers.dateAnswered = new Date().toLocaleString(),this.answeredTime);
        console.log(this.answeredTime);
        this.studentService
            .publishAnswer(this.answers)
            .subscribe(r => {
                if(r['affectedRows']) {
                    this.router.navigate(['/student/'+this.student.id +'/quiz/completed']);
                }                
            });
    }

    ngOnInit() {
        this.studentService.getSetting(this.student.id);
        this.sub = this.route.params.subscribe(params => {
            this.quizID = +params['id'];
            this.studentService.getQuizByID(this.quizID).subscribe(quiz => {
                this.quiz = quiz;
                /*this.one=this.quiz[0]['answer'];
                this.two=this.quiz[1]['answer'];
                this.three=this.quiz[2]['answer'];
                console.log(this.one,this.two,this.three);*/
            });
        });
        this.timer();
    }

     ngOnDestroy() {
         this.studentService.student = this.student;
     }

    logout() {
        this.studentService.logout();
    }

    toggleState() {
        this.isIn = !this.isIn; 
    }
    
}