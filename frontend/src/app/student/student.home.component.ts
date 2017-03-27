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
                        <li class="active"><a routerLink="/student/{{student.id}}/home" routerLinkActive="active">Welcome Page</a></li>
                        <li><a routerLink="/student/{{student.id}}/quizzes" routerLinkActive="active">My Assigned Quizzes</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a ><span class="glyphicon glyphicon-user"></span>{{student.firstName}}</a></li>
                        <li><a routerLink="/student/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Bye</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid test">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                     <h2 class="text-center">Welcome {{student.firstName}}</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4>Here you can answer the the quiz questions that is assigned to you</h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4>Take your time to answer the questions to your best knowledge</h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4>When your ready, click the button <strong>BEGIN</strong> below</h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <button type="button" class="btn btn-primary btn-lg btn-block" routerLink="/student/{{student.id}}/quizzes" routerLinkActive="active">BEGIN</button>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4 class="text-danger">You can exit by clicking on the button <strong>Bye</strong> at the top right corner </h4>
                </div>
            </div>
        </div>
    `,
  styles:[`
    div{font-family: "Comic Sans MS";}
  `
  ]
})
export class StudentHomeComponent implements OnInit {

    private isIn    : boolean = false;
    private student : Student = new Student();
    private colours        : Object;

    constructor(private router: Router,
                private studentService: StudentService) {
                if(this.studentService.student)
                    this.student = this.studentService.student;
    }

    ngOnInit() {
        let jwt = JSON.parse(localStorage.getItem('currentUser'));
        this.student = jwt && jwt.user;
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