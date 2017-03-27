import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router              } from '@angular/router';
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
                    <h3 class="text-center">Quizzes</h3>
                </div>
            </div>

            <div class="row">
                <h4><div class="form-group col-xs-12 text-muted col-sm-4 col-sm-offset-4" *ngIf="message">{{message}}</div></h4>
            </div> 

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <div id="quizzes" class="pre-scrollable">
                        <label>Quiz Name</label>
                        <ol>
                            <li *ngFor="let quiz of quizzes; let i = index" (click)="showQuizDetails(i, quiz)"><button class=" btn btn-link">{{quiz.operator}}</button> </li>
                        </ol>
                    </div> 
                </div> 
            </div>

           
        </div>
    `,
  styles:[`
    div{font-family: "Comic Sans MS";} #quizzes {height:400px;}
  `
  ]
})
export class StudentQuizzesComponent implements OnInit {

    private isIn    : boolean = false;
    private id      : number;
    private student : Student = new Student();
    private quizzes        : Object[];
    private indx            : number = -1;
    private message   : string = '';

    constructor(private studentService: StudentService,
                private router : Router) {
                if(this.studentService.student)
                    this.student = this.studentService.student;
                    this.getQuizzes();
                    
    }
    getQuizzes() {
        this.studentService
            .getQuizzes(this.student)
            .subscribe(quizzes => {
                if(quizzes.length !=0) {
                    this.message= "Below is a list of quizzes that needs to be completed";
                    this.quizzes = quizzes
                }
                else{
                    this.message= "you have no assigned quizzes !! Have a nice day :)";
                }

            });
    }

    showQuizDetails(i, quiz){
        this.indx = i;
        this.router.navigate(['/student/' + this.student.id + '/quizzes/quiz/', quiz.id]);
    }

    ngOnInit() {
        this.studentService.getSetting(this.student.id);
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