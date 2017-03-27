import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'teacher-navbar',
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
                <div class="collapse navbar-collapse"[ngClass]="{ 'in': isIn }">
                    <ul class="nav navbar-nav">
                        <li class="active"><a routerLink="/teacher/home/{{teacher.id}}" routerLinkActive="active">Home</a></li>
                        <li><a routerLink="/teacher/students" routerLinkActive="active">Add Student</a></li>
                        <li><a routerLink="/teacher/students" routerLinkActive="active">View Students</a></li>
                        <li><a routerLink="/teacher/quiz" routerLinkActive="active">Create Quiz</a></li>
                        <li><a routerLink="/teacher/dashboard" routerLinkActive="active">Dashboard</a></li>
                        <li><a routerLink="/teacher/colour" routerLinkActive="active">Customize Colour</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a routerLink="/teacher/profile/{{teacher.id}}" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>{{teacher.firstName}}</a></li>
                        <li><a routerLink="/teacher/login" routerLinkActive="active"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>

    `
})
export class TeacherNavbarComponent implements OnInit {

    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

    constructor() {}

    ngOnInit() {}
    
}//end class