import {Component, OnInit, OnDestroy } from '@angular/core';
import { Http                         } from '@angular/http';
import { Router                       } from '@angular/router';
//import { Subscription                } from 'rxjs/Subscription';

import { Student               } from '../student/student';
import { StudentService        } from '../student/student.service';
//import { TeacherNavbarComponent      } from './teacher.navbar.component';

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
                        <li><a routerLink="/student/{{student.id}}/quizzes" routerLinkActive="active">My Assigned Quizzes</a></li>
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
                     <h2 class="text-center">Congratulation {{student.firstName}}</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4 class="text-center">You have completed the Quiz</h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-2 col-md-2 col-sm-offset-5">
                    <img src="/assets/images/medal.png" width="150" height="auto">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4 class="text-center text-danger">To Exit please click the <strong>Bye</strong> Button</h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4 class="text-center text-primary">To check more quizzes click <strong>My Assigned Quizzes</strong> Button</h4>
                </div>
            </div>
            
        </div>
    `,
  styles:[`
    div{font-family: "Comic Sans MS";}
  `
  ]
})
export class StudentCompletedComponent implements OnInit {

    private isIn    : boolean = false;
    private student : Student = new Student();

    constructor(private router: Router,
                private studentService: StudentService) {
                if(this.studentService.student)
                    this.student = this.studentService.student;
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