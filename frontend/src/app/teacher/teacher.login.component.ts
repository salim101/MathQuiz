import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http                         } from '@angular/http';
import { Router                       } from '@angular/router';
import { FormGroup, FormControl,
         Validators, FormBuilder      } from '@angular/forms';
import { ValidationService            } from '../services/validation.service';

import 'rxjs/add/operator/map';

import { AuthenticationService } from '../services/authentication.service';
import { Teacher               } from './teacher';
import { TeacherService        } from './teacher.service';

@Component ({
    template: `
        <div class="container-fluid">
            <section class="sample-app-content well">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                        <h2 class="text-center">Teacher Login </h2><br>
                        <h4>Please fill in the form to login</h4>
                    </div>
                </div>

                <form [formGroup]="form" (ngSubmit)="login()">
                    
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Email:</label>
                            <input type="email" formControlName="email" class="form-control" placeholder="Enter email">
                            <control-messages [control]="form.controls.email"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <label>Password:</label>
                            <input type="password" formControlName="password" class="form-control" placeholder="Enter password">
                            <control-messages [control]="form.controls.password"></control-messages>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-1 col-sm-offset-4">
                            <button type="submit" [disabled]="!form.valid" class="btn btn-success">Login</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-1">
                            <button type="button" class="btn btn-primary" routerLink="/teacher/register" routerLinkActive="active">Register</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-1">
                            <button type="button" class="btn btn btn-danger" routerLink="/welcome" routerLinkActive="active">Cancel</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12  col-sm-4 col-sm-offset-4 alert alert-danger" *ngIf="error">{{error}}</div>
                    </div>
                </form>
            </section>
        </div>
        
  `
})
export class TeacherLoginComponent implements OnInit, OnDestroy {

    private form    : FormGroup;
    private teacher : Teacher = new Teacher();
    private error   : string = '';
    
    constructor(private teacherService : TeacherService,
                private fb             : FormBuilder,
                private router         : Router) {}

    ngOnInit() {
        this.form = this.fb.group({
            "email"    : [null, Validators.required],
            "password" : [null, Validators.required]
        });
        
        this.form.valueChanges
            .map      (value => this.teacher = value)
            .filter   (value => this.form.valid)
            .subscribe(value => value);
    }

    ngOnDestroy() {}

    login() {
        this.teacherService
            .login    ('teacher', this.teacher)
            .subscribe(result => {
                if(result) {
                    let jwt = JSON.parse(localStorage.getItem('currentUser'));
                    this.router.navigate(['/teacher/' + jwt.user.id + '/home']);
                } else {
                    this.error= "invalid login credtenials";
                }
            });
    }
}