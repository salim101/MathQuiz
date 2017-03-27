import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http              } from '@angular/http';
import { Router            } from '@angular/router';
import 'rxjs/add/operator/map';

import { Teacher        } from './teacher';
import { TeacherService } from './teacher.service';
import { AlertService } from '../services/alert.service';
import { ValidationService } from '../services/validation.service';

@Component ({
    template: `
        <div class="container-fluid">
            <section class="sample-app-content well">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                        <h2 class="text-center">Teacher Registration </h2><br>
                        <h4>Please fill in the form to register</h4>
                    </div>
                </div>

                <form [formGroup]="form" (ngSubmit)="register()">
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
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Email:</label>
                            <input type="email" formControlName="email" id="email" class="form-control" placeholder="Enter email" />
                            <control-messages [control]="form.controls.email"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Password:</label>
                            <input type="password" formControlName="password" id="password" class="form-control" placeholder="Enter password" />
                            <control-messages [control]="form.controls.password" ></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <button type="submit" [disabled]="!form.valid" class="btn btn-success">Register</button>
                        </div>

                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <button type="button" class="btn btn btn-danger" routerLink="/teacher" routerLinkActive="active">Cancel</button>
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
export class TeacherRegisterComponent implements OnInit {

    private form    : FormGroup;
    private teacher : Teacher = new Teacher();
    private error   : string  = '';
    
    constructor(private teacherService : TeacherService,
                private fb             : FormBuilder,
                private router         : Router,
                private alertService   : AlertService) {}

    register() {
        this.teacherService
            .register(this.teacher)
            .subscribe(r => {
                if(r['affectedRows']){
                    this.alertService.success('Registration successful, please login', true);
                    this.router.navigate(['/teacher']);
                } else {
                    this.error = 'Record already exist with this email!';
                }                
            });
    }//end register

    ngOnInit() {
        this.form = this.fb.group({
            "firstName": [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(15)])],
            "lastName" : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
            "email"    : [null, Validators.compose([Validators.required])],
            "password" : [null, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(15)])]
        });

        this.form.valueChanges
        .map(value => {
            this.teacher.create(null,value.firstName, value.lastName, value.email, value.password);
            return this.teacher;
        })
        .filter(value => this.form.valid)
        .subscribe(value => value);
        
    }//end ngOnInit()


    
    
}//end class