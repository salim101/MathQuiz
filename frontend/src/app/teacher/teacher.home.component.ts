import {Component, OnInit, OnDestroy } from '@angular/core';
//import { Router              } from '@angular/router';
//import { Subscription                } from 'rxjs/Subscription';

import { Teacher                     } from './teacher';
import { TeacherService              } from './teacher.service';
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
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/home" routerLinkActive="active">Home</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/add-student" routerLinkActive="active">Add Student</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/students" routerLinkActive="active">View Students</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/quiz" routerLinkActive="active">Create Quiz</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/dashboard" routerLinkActive="active">Dashboard</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/colour" routerLinkActive="active">Customize Colour</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a routerLink="/teacher/{{teacher.id}}/profile" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>{{teacher.firstName}}</a></li>
                        <li><a routerLink="/teacher/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid well">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                     <h2 class="text-center">Welcome {{teacher.firstName}}</h2>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4>Below is a brief information on system functionality and interaction </h4>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <ol>
                        <li>Add student by clicking on <strong>Add student</strong></li><br>
                        <li>View students by clicking on <strong>View students</strong></li><br>
                        <li>Create and Assign Quizzes to specific class level i.e.<em> Beginners, 
                            Intermediate or Advance </em>by clicking on <strong>Create Quiz</strong></li><br>
                        <li>View class performance by clicking on <strong>Performance Dashboard</strong></li><br>
                        <li>Customize background or font colour for specific student by clicking on <strong>Cutomize Colour</strong></li><br>
                        <li>View your profile details by clicking on your name at the top right</li><br>
                        <li>Logout of the application by clicking on <strong>Logout</strong></li>
                    </ol>
                </div>
            </div>
        </div>
    `
})
export class TeacherHomeComponent implements OnInit {

    private isIn    : boolean = false;
    private id      : number;
    private teacher : Teacher = new Teacher();

    constructor(private teacherService: TeacherService) {
        if(this.teacherService.teacher)
            this.teacher = this.teacherService.teacher;
    }

    ngOnInit() {
        /*if(this.teacherService.teacher)
            this.teacher = this.teacherService.teacher;*/

        //added this => if user is removed from localStorage while logged in and login back 
        let jwt = JSON.parse(localStorage.getItem('currentUser'));
        this.teacher = jwt && jwt.user;

    }

     ngOnDestroy() {
         this.teacherService.teacher = this.teacher;
     }

    logout() {
        this.teacherService.logout();
    }

    toggleState() {
        this.isIn = !this.isIn; 
    }
    
}