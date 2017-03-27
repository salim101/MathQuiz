import { Component, OnInit       } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http                    } from '@angular/http';
import { Subscription            } from 'rxjs/Subscription';
import { Router            } from '@angular/router';
import 'rxjs/add/operator/map';

import { Teacher        } from './teacher';
import { TeacherService } from './teacher.service';
import { AlertService } from '../services/alert.service';
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
                        <li><a routerLink="/teacher/{{teacher.id}}/colour" routerLinkActive="active">Customize Colour</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/profile" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>{{teacher.firstName}}</a></li>
                        <li><a routerLink="/teacher/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container-fluid well">
            <section class="sample-app-content">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                        <h2 class="text-center">My Profile </h2><br>
                    </div>
                </div>

                <form [formGroup]="form">
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <label>First Name:</label>
                            <input type="text" formControlName="firstName" id="firstName" class="form-control" placeholder="Enter firstname" value="{{teacher.firstName}}">
                            <control-messages [control]="form.controls.firstName"></control-messages>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <label>Last Name:</label>
                            <input type="text" formControlName="lastName" id="lastName" class="form-control" placeholder="Enter lastname" value="{{teacher.lastName}}">
                            <control-messages [control]="form.controls.lastName"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Email:</label>
                            <input type="text" formControlName="email" id="email" class="form-control" placeholder="Enter email" value="{{teacher.email}}">
                            <control-messages [control]="form.controls.email"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Password:</label>
                            <input type="text" formControlName="password" id="password" class="form-control" placeholder="password" value="{{teacher.password}}">
                            <control-messages [control]="form.controls.password" ></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <button type="button" class="btn btn-primary" routerLinkActive="active" (click)='update(form.value)'>Update Profile</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2">
                            <button 
                                type="button" class="btn btn btn-danger" 
                                mwlConfirmationPopover
                                [title]="title"
                                [message]="message"
                                [confirmText]="confirmText"
                                [cancelText]="cancelText"
                                [placement]="placement"
                                (confirm)="delete()"
                                (cancel)="cancelClicked = true"
                                confirmButtonType="danger"
                                cancelButtonType="default"
                                (click)="confirmClicked = false; cancelClicked = false"
                                [appendToBody]="true">Delete Account
                            </button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12  col-sm-4 col-sm-offset-4 alert alert-danger" *ngIf="error">{{error}}</div>
                    </div>
                </form>                
            </section>
            {{teacher.firstName}}, {{teacher.lastName}}, {{teacher.email}}, {{teacher.password}}
        </div>
    `
})
export class TeacherProfileComponent implements OnInit {
    private isIn     : boolean = false;
    private form    : FormGroup;
    private error : string = '';
    private id: number;
    private subcription: Subscription;
    private teacher : Teacher = new Teacher();

    private placements     : string[] = ['top'];
    private title          : string   = 'Deleting Account';
    private message        : string   = 'Are you <b>sure</b> you want to Delete Account';
    private confirmText    : string   = 'Yes <i class="glyphicon glyphicon-ok"></i>';
    private cancelText     : string   = 'No <i class="glyphicon glyphicon-remove"></i>';
    private confirmClicked : boolean  = false;
    private cancelClicked  : boolean  = false;


    constructor(private fb             : FormBuilder,
                private router         : Router,
                private teacherService : TeacherService,
                private alertService   : AlertService) {
                    /*if(this.teacherService.teacher)
                        this.teacherService
                            .getTeacher()
                            .subscribe(teacher => this.teacher = teacher);*/
                    // }
                    this.loadTeacher();
                }

    

    delete() {
        if(this.teacher) {
            this.teacherService
                .deregister()
                .subscribe(result => {
                    if(result['affectedRows']===1){
                        this.teacher = null;
                        this.teacherService.logout();
                        this.alertService.error('You have de-degistered !! Please register again if you wish', true);
                        this.router.navigate(['/teacher/register']);
                    }
                });
        } 
    }

    update(value) {
        console.log(value);
        /*if(this.teacher) {
            this.teacherService
                .update(this.teacher)
                .subscribe(result => {
                    console.log(result);
                });
        }*/ 
    }

    loadTeacher(){
        if(this.teacherService.teacher)
            this.teacherService
                .getTeacher()
                .subscribe(teacher => this.teacher = teacher);
    }



    ngOnInit() {
        this.form = this.fb.group({
            "firstName": [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(15)])],
            "lastName" : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
            "email"    : [null, Validators.compose([Validators.required])],
            "password" : [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(15)])]
        });

        /*this.form.valueChanges
        .map(value => {
            this.teacher.update(null,value.firstName, value.lastName, value.email, value.password);
            return this.teacher;
        })
        .filter(value => this.form.valid)
        .subscribe(value => {
            console.log("Model Driven Form valid value: vm = ",JSON.stringify(value));
        });*/

        /*(<FormGroup>this.form)
            .setValue(this.teacher.firstName, { onlySelf: true });*/
        
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