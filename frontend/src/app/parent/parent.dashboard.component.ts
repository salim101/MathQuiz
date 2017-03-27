import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Parent                } from './parent';
import { ParentService         } from './parent.service';
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
                        <li><a routerLink="/parent/{{parent.id}}/home" routerLinkActive="active">Home</a></li>
                        <li><a routerLink="/parent/{{parent.id}}/add-child" routerLinkActive="active">Add Child to Account</a></li>
                        <li><a routerLink="/parent/{{parent.id}}/view-child" routerLinkActive="active">View Child Details</a></li>
                        <li class="active"><a routerLink="/parent/{{parent.id}}/dashboard" routerLinkActive="active">View Child Records</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a ><span class="glyphicon glyphicon-user"></span>{{[parent.firstName]}}</a></li>
                        <li><a routerLink="/parent/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>



        <div class="container-fluid">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-6 col-sm-offset-3">
                    <h4 class="text-center">Viewing Child Performance</h4>
                </div>  
            </div>

            <form [formGroup]="form">

                <div class="row">
                    <div class="form-group col-xs-12 col-sm-4 col-md-2">
                        <label>Select Child Name: </label>
                     </div>
                    <div class="form-group col-xs-12 col-sm-4 col-md-2">
                        <select  class="form-control" formControlName="childID" id="childID">
                            <option *ngFor="let student of students" value="{{student.id}}">{{student.firstName}} {{student.lastName}}</option>
                        </select>
                        <!-- <control-messages [control]="form.controls.childID"></control-messages> -->
                    </div>
                    
                    <div class="form-group col-xs-12 col-sm-4 col-md-2">
                        <button type="button" [disabled]="!form.valid" class="btn btn-primary" (click)="getRecords(form.value)">ok</button>
                    </div>
                </div>

                <div *ngIf="pressed" class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div>
                            <h4 class="text-center"> No of Assigned Quizzes to Child</h4>
                            <div style="display: block">
                                <canvas baseChart
                                        [datasets]="assignedQuizzesDatasets"
                                        [labels]="labels"
                                        [options]="options"
                                        [legend]="barChartLegend"
                                        [chartType]="type">
                                </canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div>
                            <h4 class="text-center"> No of Answered Quizzes</h4>
                            <div style="display: block">
                                <canvas height="148px" baseChart
                                        [data]="answeredQuizzesData"
                                        [labels]="pieChartLabels"
                                        [chartType]="pieChartType">
                                </canvas>
                            </div>
                        </div>
                    </div>
            </div><br>
                
             </form>

        </div>
    `
})
export class ParentDashboardComponent implements OnInit {

    private isIn     : boolean = false;
    private pressed : boolean = false;
    private parent  : Parent = new Parent();
    private students : Object[];
    private form     : FormGroup;

    private options = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
                ticks: {   
                    beginAtZero: true, 
                    suggestedMax: 5,
                    stepSize: 1
                } 
            }],
            xAxes: [{
                barThickness : 60,
                display: true,
                ticks: {}
            }]
        },
    };
    


    private labels = [''];
    private type = 'bar';
    private barChartLegend:boolean = true;

    private assignedQuizzesDatasets:any[] = [{
        label: 'Addition',
        data: [],
        borderWidth: 2
        
    }, {
        label: 'Subtraction',
        data: [],
        borderWidth: 2
        
    },{
        label: 'Multiplication',
        data: [],
        borderWidth: 2
    }, {
        label: 'Division',
        data: [],
        borderWidth: 2
    }];

    private pieChartLabels:string[] = ['Addition','Subtraction','Multiplication','Division'];
    private answeredQuizzesData:any[] = [0,0,0,0];
    private pieChartType:string = 'pie';

    constructor(private parentService: ParentService,
                private fb            : FormBuilder,) {
                if(this.parentService.parent)
                    this.parent = this.parentService.parent;
                if(this.parent) {
                    this.parentService
                        .getChilds()
                        .subscribe(students => this.students = students);
                }
    }

    getRecords(value){
        this.pressed=true;
        this.parentService
            .countTotalAssignedQuizzes(value['childID'])
            .subscribe(assignedQuizzes => {
                if(assignedQuizzes.length != 0) {
                    this.assignedQuizzesDatasets = [ {data: [assignedQuizzes[0]['total']]}, {data: [assignedQuizzes[3]['total']]}, {data: [assignedQuizzes[2]['total']]}, {data: [assignedQuizzes[1]['total']]} ];
                }      
            });
        
        this.parentService
            .countTotalAnsweredQuizzes(value['childID'])
            .subscribe(answeredQuizzes => {
                if(answeredQuizzes.length != 0) {
                    this.answeredQuizzesData = [ [answeredQuizzes[0]['total']], [answeredQuizzes[3]['total']], [answeredQuizzes[2]['total']], [answeredQuizzes[1]['total']] ];
                }      
            });

    }
    

    ngOnInit() {
         this.form = this.fb.group({
            "childID"  : [null, Validators.compose([Validators.required])]         
        });
        
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