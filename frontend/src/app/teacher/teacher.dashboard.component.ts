import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Teacher } from './teacher';
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
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/dashboard" routerLinkActive="active">Dashboard</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/colour" routerLinkActive="active">Customize Colour</a></li>
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
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <div>
                        <h4 class="text-center"> No of Students per class level</h4>
                        <div style="display: block">
                            <canvas id="bar" baseChart
                                    [datasets]="classLevelsdatasets"
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
                        <h4 class="text-center"> No of Quizzes assigned per class level</h4>
                        <div style="display: block">
                            <canvas baseChart
                                    [datasets]="classLevelsQuizzesdatasets"
                                    [labels]="labels"
                                    [options]="options"
                                    [legend]="barChartLegend"
                                    [chartType]="type">
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6"><br><br>
                    <p class="text-danger"><strong>To View number of quizzes by level, please select the level below</strong></p>
                </div>
            </div>

            <div class="row">
                <form [formGroup]="form">
                    <div class="form-group col-xs-12 col-sm-3 col-md-2" >
                        <label>Select Level: </label>
                     </div>
                    <div class="form-group col-xs-12 col-sm-3 col-md-2">
                        <select formControlName="level" class="form-control" id="level">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advance">Advance</option>
                        </select>
                        <control-messages [control]="form.controls.level"></control-messages>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-2">
                        <button type="button" [disabled]="!form.valid" class="btn btn-primary" (click)="countTotalQuizzesByClassLevel(form.value)">View</button>
                    </div>
                </form>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <div>
                        <h4 class="text-center"> No of Quizzes assigned per class level based on operator</h4>
                        <div style="display: block">
                            <canvas baseChart
                                    [datasets]="quizzesOperatorsByLevelDatasets"
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
                        <h4 class="text-center"> No of students answered the quiz according to the class level</h4>
                        <div style="display: block">
                            <canvas height="148px" baseChart
                                    [data]="pieChartData"
                                    [labels]="pieChartLabels"
                                    [chartType]="pieChartType">
                            </canvas>
                        </div>
                    </div>
                </div>
            </div><br>


            <!--
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <div>
                        <h4 class="text-center">Overall class peformance</h4>
                        
                    </div>
                </div>
            </div>
            -->
            
            <br><br>

           



            
        </div>
    `
})
export class TeacherDashboardComponent implements OnInit {

    private isIn     : boolean = false;
    private pressed1 : boolean = false;
    private form     : FormGroup;
    private teacher  : Teacher = new Teacher();
    private students        : Object[];


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
 




    private classLevelsdatasets:any[] = [{
        label: 'Beginner',
        data: [],
        borderWidth: 2
        
    }, {
        label: 'Intermediate',
        data: [],
        borderWidth: 2
        
    },{
        label: 'Advance',
        data: [],
        borderWidth: 2
    }];



    private classLevelsQuizzesdatasets:any[] = [{
        label: 'Beginner',
        data: [],
        borderWidth: 2
        
    }, {
        label: 'Intermediate',
        data: [],
        borderWidth: 2
        
    },{
        label: 'Advance',
        data: [],
        borderWidth: 2
    }];



    private quizzesOperatorsByLevelDatasets:any[] = [{
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
    private pieChartData:any[] = [0,0,0,0];
    private pieChartType:string = 'pie';


    
    
    constructor(private teacherService: TeacherService,
                private fb            : FormBuilder) {
                if(this.teacherService.teacher)
                    this.teacher = this.teacherService.teacher;
    }
    



    countTotalStudentsByLevel() {
        this.teacherService
            .countTotalStudentsByLevel()
            .subscribe(classLevel => {
                if(classLevel.length != 0) {
                    this.classLevelsdatasets = [ {data: [classLevel[1]['total']]}, {data: [classLevel[2]['total']]}, {data: [classLevel[0]['total']]} ];
                }//end if           
            });
    }

    
    
    
    countTotalQuizzesByLevel() {
        this.teacherService
            .countTotalQuizzesByLevel()
            .subscribe(classLevel => {
               if(classLevel.length != 0) {
                   this.classLevelsQuizzesdatasets = [ {data: [classLevel[1]['total']]}, {data: [classLevel[2]['total']]}, {data: [classLevel[0]['total']]} ];  
                }             
            });
    }

    
    
    
    countTotalQuizzesByClassLevel(value) {
        this.teacherService
            .countTotalQuizzesByClassLevel(value['level'])
            .subscribe(operatorQuizzes => {
                if(operatorQuizzes.length != 0) {
                    this.quizzesOperatorsByLevelDatasets = [ {data: [operatorQuizzes[0]['total']]}, {data: [operatorQuizzes[3]['total']]}, {data: [operatorQuizzes[2]['total']]}, {data: [operatorQuizzes[1]['total']]} ];
                }       
            });
        
        this.teacherService
            .countTotalQuizzesAnsweredByClassLevel(value['level'])
            .subscribe(operatorQuizzes => {
                if(operatorQuizzes.length != 0) {
                   this.pieChartData = [ [operatorQuizzes[0]['total']], [operatorQuizzes[3]['total']], [operatorQuizzes[2]['total']], [operatorQuizzes[1]['total']] ];  
                }          
            });
    }
    
     
    ngOnInit() {
        this.countTotalStudentsByLevel();
        this.countTotalQuizzesByLevel();
        this.countTotalQuizzesByClassLevel({level: "Beginner"});
        this.form = this.fb.group({
            "level"  : [null, Validators.compose([Validators.required])]          
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

