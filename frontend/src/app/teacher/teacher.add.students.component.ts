import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http              } from '@angular/http';
import { Router            } from '@angular/router';
import 'rxjs/add/operator/map';
import { AlertService } from '../services/alert.service';
import { ValidationService } from '../services/validation.service';
import { Teacher           } from './teacher';
import { TeacherService    } from './teacher.service';
import { Student           } from '../student/student';

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
                        <li><a routerLink="/teacher/{{teacher.id}}/home" routerLinkActive="active">Home</a></li>
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/add-student" routerLinkActive="active">Add Student</a></li>
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
            <section class="sample-app-content">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-sm-offset-3">
                        <h2 class="text-center">Student Registration Form </h2><br>
                        <h4>Please fill in the form to register a student</h4>
                    </div>
                </div>

                <form [formGroup]="form" (ngSubmit)="registerStudent()">
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <label>First Name:</label>
                            <input type="text" formControlName="firstName" id="firstName" class="form-control" placeholder="Enter firstname">
                            <control-messages [control]="form.controls.firstName"></control-messages>
                        </div>
                    
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <label>Last Name:</label>
                            <input type="text" formControlName="lastName" id="lastName" class="form-control" placeholder="Enter lastname">
                            <control-messages [control]="form.controls.lastName"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4 col-md-4">
                            <label>Level:</label>
                            <select name="select" formControlName="level" class="form-control" id="level">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advance</option>
                            </select>
                            <control-messages [control]="form.controls.level"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <p class="text-danger">Enter student login credentials</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <label>Username:</label>
                            <input type="text" formControlName="username" id="username" class="form-control" placeholder="Enter Username">
                            <control-messages [control]="form.controls.username"></control-messages>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <label>Password:</label>
                            <input type="text" formControlName="password" id="password" class="form-control" placeholder="Enter password">
                            <control-messages [control]="form.controls.password"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <button type="submit" [disabled]="!form.valid" class="btn btn-success">Register Student</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <button type="button" class="btn btn btn-danger" routerLink="/teacher/{{teacher.id}}/home" routerLinkActive="active">Cancel</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12  col-sm-4 col-sm-offset-4 alert alert-danger" *ngIf="error">{{error}}</div>
                    </div>
                </form>
            </section>
            {{teacher.id}}, {{student.firstName}}, {{student.lastName}},{{student.level}},{{student.username}},{{student.password}}
        </div>
    `
})
export class TeacherAddStudentComponent implements OnInit {

    private isIn     : boolean = false;
    private teacher  : Teacher = new Teacher();
    private student  : Student = new Student();
    private students : Object[];
    private form     : FormGroup;
    private error    : string  = '';

    constructor(private teacherService: TeacherService,
                private fb             : FormBuilder,
                private router         : Router,
                private alertService   : AlertService) {
                if(this.teacherService.teacher)
                    this.teacher = this.teacherService.teacher;
    }
        

    registerStudent() {
        this.teacherService
            .registerStudent(this.student)
            .subscribe(r => {
                if(r['affectedRows']){
                    //this.alertService.success('Student successfully registered', true);
                    this.router.navigate(['/teacher/{{teacher.id}}/students']);
                } else {
                    this.error = 'Username already exists';
                }               
            });
    }//end registerStudent

    ngOnInit() {
        
        this.form = this.fb.group({
            "firstName": [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(15)])],
            "lastName" : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
            "level"    : [null, Validators.compose([Validators.required])],
            "username" : [null, Validators.compose([Validators.required])],
            "password" : [null, Validators.compose([Validators.required])]            
        });

        this.form.valueChanges
        .map(value => {
            this.student.create(this.student.id=Math.random().toString(32).substring(2),this.teacher.id,0,value.firstName, value.lastName,value.level,value.username,value.password);
            return this.student;
        })
        .filter(value => this.form.valid)
        .subscribe(value => value);
        
    }//end ngOnInit()

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