import {Component, OnInit, OnDestroy } from '@angular/core';

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
                        <li class="active"><a routerLink="/parent/{{parent.id}}/home" routerLinkActive="active">Home</a></li>
                        <li><a routerLink="/parent/{{parent.id}}/add-child" routerLinkActive="active">Add Child to Account</a></li>
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
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                     <h2 class="text-center">Welcome {{parent.firstName}}</h2>
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
                        <li>Add child to profile by clicking on <strong>Add Child to Profile</strong></li><br>
                        <li>View child details by clicking on <strong>View Child Details</strong></li><br>
                        <li>View child Records by clicking on <strong>View child Records</strong></li><br>
                        <li>Logout of the application by clicking on <strong>Logout</strong></li>
                    </ol>
                </div>
            </div>
        </div>
    `
})
export class ParentHomeComponent implements OnInit {

    private isIn    : boolean = false;
    private id      : number;
    private parent : Parent = new Parent();

    constructor(private parentService: ParentService) {
        if(this.parentService.parent)
            this.parent = this.parentService.parent;
    }

    ngOnInit() {
        /*if(this.teacherService.teacher)
            this.teacher = this.teacherService.teacher;*/

        //added this => if user is removed from localStorage while logged in and login back 
        let jwt = JSON.parse(localStorage.getItem('currentUser'));
        this.parent = jwt && jwt.user;

    }

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