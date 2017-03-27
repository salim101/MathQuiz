import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http              } from '@angular/http';
import { Router            } from '@angular/router';
import 'rxjs/add/operator/map';
import { AlertService } from '../services/alert.service';
import { ValidationService } from '../services/validation.service';
import { Parent                } from './parent';
import { ParentService         } from './parent.service';

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
                        <li><a routerLink="/parent/{{parent.id}}/home" routerLinkActive="active">Home</a></li>
                        <li class="active"><a routerLink="/parent/{{parent.id}}/add-child" routerLinkActive="active">Add Child to Account </a></li>
                        <li><a routerLink="/parent/{{parent.id}}/view-child" routerLinkActive="active">View Child Details</a></li>
                        <li><a routerLink="/parent/{{parent.id}}/dashboard" routerLinkActive="active">View Child Records</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a ><span class="glyphicon glyphicon-user"></span>{{[parent.firstName]}}</a></li>
                        <li><a routerLink="/parent/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <div class="container-fluid well">
            <section class="sample-app-content">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-sm-offset-3">
                        <h3 class="text-center">Adding child to Profile</h3><br>
                    </div>
                </div>

                <form [formGroup]="form">
                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
                            <label>Please enter Student ID provided by the teacher:</label>
                            <input type="text" formControlName="studentid" id="studentid" class="form-control" placeholder="Enter student">
                            <!-- <control-messages [control]="form.controls.studentid"></control-messages> -->
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-4">
                            <button type="submit" [disabled]="!form.valid" class="btn btn-primary" (click)="addChild(form.value)">Add Child</button>
                        </div>
                        <div class="form-group col-xs-12 col-sm-2 col-sm-offset-0">
                            <button type="button" class="btn btn btn-danger" routerLink="/parent/{{parent.id}}/home" routerLinkActive="active">Cancel</button>
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
export class ParentAddChildComponent implements OnInit {

    private isIn     : boolean = false;
    private parent  : Parent = new Parent();
    private form     : FormGroup;
    private error    : string  = '';

    constructor(private parentService: ParentService,
                private fb             : FormBuilder,
                private router         : Router,
                private alertService   : AlertService) {
                if(this.parentService.parent)
                    this.parent = this.parentService.parent;
    }
        

    addChild(value) {
        console.log(value['studentid']);
        this.parentService
            .addChild(value)
            .subscribe(r => {
                if(r['affectedRows']){
                    //this.alertService.success('Student successfully registered', true);
                    this.router.navigate(['/parent/{{parent.id}}/view-child']);
                } else {
                    this.error = 'Error!! student ID did not match';
                }              
            })
    }

    ngOnInit() {
        
        this.form = this.fb.group({
            "studentid" : [null, Validators.compose([Validators.required])]            
        });
        
    }//end ngOnInit()

    ngOnDestroy() {
         this.parentService.parent = this.parent;
     }

    logout() {
        this.parentService.logout();
    }


    toggleState() {
        this.isIn = !this.isIn; 
    }


}