import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Teacher } from './teacher';
import { Customcolour } from './customcolour';
import { TeacherService } from './teacher.service';
import { ValidationService } from '../services/validation.service';

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
                        <li><a routerLink="/teacher/{{teacher.id}}/add-student" routerLinkActive="active">Add Student</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/students" routerLinkActive="active">View Students</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/quiz" routerLinkActive="active">Create Quiz</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/dashboard" routerLinkActive="active">Dashboard</a></li>
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/colour" routerLinkActive="active">Customize Colour</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a routerLink="/teacher/{{teacher.id}}/profile" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>{{teacher.firstName}}</a></li>
                        <li><a routerLink="/teacher/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>



        <div class="container-fluid">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h3 class="text-center">Customization for Student</h3>
                </div>  
            </div>

            <form [formGroup]="form">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-3 col-md-3 col-sm-offset-4" >
                        <label>Change Background colour to: </label>
                     </div>
                    <div class="form-group col-xs-12 col-sm-2 col-md-2">
                        <select formControlName="backgroundColour" class="form-control" id="backgroundColour">
                            <option value="none">Default</option>
                            <option value="yellow">Yellow</option>
                            <option value="lightyellow">Light Yellow</option>
                            <option value="cyan">Cyan</option>
                            <option value="lightblue">Light Blue</option>
                            <option value="lightgreen">Light Green</option>
                            <option value="orange">Orange</option>
                            <option value="pink">Pink</option>
                        </select>
                        <control-messages [control]="form.controls.backgroundColour"></control-messages>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12 col-sm-3 col-md-3 col-sm-offset-4" >
                        <label>Change font size to: </label>
                     </div>
                    <div class="form-group col-xs-12 col-sm-2 col-md-2">
                        <select formControlName="fontSize" class="form-control" id="fontSize">
                            <option value="14px">Default</option>
                            <option value="12px">12</option>
                            <option value="14px">14</option>
                            <option value="16px">16</option>
                            <option value="18px">18</option>
                            <option value="20px">20</option>
                            <option value="24px">24</option>
                        </select>
                        <control-messages [control]="form.controls.fontSize"></control-messages>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12 col-sm-3 col-md-3 col-sm-offset-4" >
                        <label>For student: </label>
                     </div>
                    <div class="form-group col-xs-12 col-sm-2 col-md-2">
                        <select  class="form-control" formControlName="studentId" id="studentId">
                            <option *ngFor="let student of students" value="{{student.id}}">{{student.firstName}} {{student.lastName}}</option>
                        </select>
                        <control-messages [control]="form.controls.studentId"></control-messages>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12 col-sm-2 col-md-2 col-sm-offset-5">
                        <button type="button" [disabled]="!form.valid" class="btn btn-warning" (click)="customization(form.value)">Save Customize Changes</button>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12 col-sm-2 col-md-2 col-sm-offset-5 alert alert-danger" *ngIf="error">{{error}}</div>
                    <div class="form-group col-xs-12 col-sm-2 col-md-2 col-sm-offset-5 alert alert-success" *ngIf="success">{{success}}</div>
                </div>
                
                
             </form>

        </div>
    `
})
export class TeacherCustomcolourComponent implements OnInit {

    private isIn     : boolean = false;
    private teacher  : Teacher = new Teacher();
    private customcolour  : Customcolour = new Customcolour();
    private students : Object[];
    private form     : FormGroup;
    private error    : string  = '';
    private success  : string  = '';

    constructor(private teacherService: TeacherService,
                private fb            : FormBuilder,) {
                if(this.teacherService.teacher)
                    this.teacher = this.teacherService.teacher;
                if(this.teacher) {
                    this.teacherService
                        .getStudents()
                        .subscribe(students => this.students = students);
                }
    }
    customization(value) {
        this.customcolour.create(value.studentId,value.backgroundColour,value.fontSize);
        this.teacherService
            .insertCustomcolour(this.customcolour)
            .subscribe(r => {
                if(r['affectedRows']) {
                    this.success = 'Changes has been saved';
                }
                else{
                   this.teacherService
                        .updateCustomcolour(this.customcolour)
                        .subscribe(r => {
                            if(r['affectedRows']) {
                                this.success = 'Changes has been updated';
                            }
                            else{
                                this.error = 'something went wrong when updating'
                            }                
                        });
                }                
            });

    }

    ngOnInit() {
         this.form = this.fb.group({
            "backgroundColour"  : [null, Validators.compose([Validators.required])],
            "studentId"         : [null, Validators.compose([Validators.required])] ,
            "fontSize"          : [null, Validators.compose([Validators.required])]          
        });
        
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