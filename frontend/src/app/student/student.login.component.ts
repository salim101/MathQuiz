import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http                         } from '@angular/http';
import { Router                       } from '@angular/router';
import { FormGroup, FormControl,
         Validators, FormBuilder      } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Student               } from '../student/student';
import { StudentService        } from '../student/student.service';

@Component ({
    template: `
        <div class="container-fluid">
            <section class="sample-app-content well">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                        <h2 class="text-center">Student Login </h2>
                    </div>
                </div>

                <form [formGroup]="form" (ngSubmit)="login()">
                    
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <h3>What is your Username?:</h3>
                            <input type="text" formControlName="username" class="form-control" placeholder="SU">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
                            <h3>What is your Password?:</h3>
                            <input type="password" formControlName="password" class="form-control" placeholder="Enter password">
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <button type="submit" [disabled]="!form.valid" class="btn btn-success btn-lg">Login</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <button type="button" class="btn btn btn-danger btn-lg" routerLink="/welcome" routerLinkActive="active">Cancel</button>
                        </div>
                    </div>

                    <div class="row"><h3>
                        <div class="form-group col-xs-12  col-sm-4 col-sm-offset-4 alert alert-danger" *ngIf="error">{{error}}</div></h3>
                    </div>
                </form>
            </section>
        </div>
        
  `,
  styles:[`
    div{font-family: "Comic Sans MS"}
  `
  ]
})
export class StudentLoginComponent implements OnInit, OnDestroy {

    private form    : FormGroup;
    private student : Student = new Student();
    private error   : string = '';
    
    constructor(private studentService : StudentService,
                private fb             : FormBuilder,
                private router         : Router) {}

    ngOnInit() {
        this.form = this.fb.group({
            "username" : [null, Validators.required],
            "password" : [null, Validators.required]
        });
        
        this.form.valueChanges
            .map      (value => this.student = value)
            //.filter   (value => this.form.valid)
            .subscribe(value => value);
    }

    ngOnDestroy() {}

    login() {
        this.studentService
            .login    ('student', this.student)
            .subscribe(result => {
                if(result) {
                    console.log(result);
                    let jwt = JSON.parse(localStorage.getItem('currentUser'));
                    console.log(jwt);
                    this.router.navigate(['/student/' + jwt.user.id + '/home']);
                } else {
                    this.error= "Ooops !! You have entered wrong username or password, Try Again";
                }
            });
    }
}