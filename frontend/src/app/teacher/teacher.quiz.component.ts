import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http              } from '@angular/http';
import { Router            } from '@angular/router';
import { Teacher           } from './teacher';
import { Quiz              } from './quiz';
import { Question          } from './question';
import { TeacherService    } from './teacher.service';
import { Student           } from '../student/student';
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
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/quiz" routerLinkActive="active">Create Quiz</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/dashboard" routerLinkActive="active">Dashboard</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/colour" routerLinkActive="active">Customize Colour</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a routerLink="/teacher/{{teacher.id}}/profile" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>{{teacher.firstName}}</a></li>
                        <li><a routerLink="/teacher/login" routerLinkActive="active" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid well">
            <form [formGroup]="form">

                <div class="row">
                    <div class="form-group col-xs-12 col-md-6">
                        <h3 class="text-center">Creating Quiz</h3>
                        <p class="text-primary">To Genarate a random quiz, Please fill in the form</p>

                        <div class="form-group col-xs-12 col-md-6">
                            <label>Level:</label>
                            <select formControlName="level" class="form-control" id="level">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advance</option>
                            </select>
                            <control-messages [control]="form.controls.level"></control-messages>
                        </div>
                        <div class="form-group col-xs-12 col-md-6">
                            <label>Select the Operator:</label>
                            <select formControlName="operator" class="form-control" id="operator">
                                <option>Addition</option>
                                <option>Subtraction</option>
                                <option>Multiplication</option>
                                <option>Divison</option>
                            </select>
                            <control-messages [control]="form.controls.operator"></control-messages>
                        </div>
                        
                        <div class="form-group col-xs-12 col-md-6">
                            <label>Minimum Number Range :</label>
                            <input type="number" formControlName="minNumber" id="minNumber" class="form-control" placeholder="Enter minimum numer range i.e. 10"> 
                            <control-messages [control]="form.controls.minNumber"></control-messages>
                        </div>
                
                        <div class="form-group col-xs-12 col-md-6">
                            <label>Maximum Number Range :</label>
                            <input type="number" formControlName="maxNumber" id="maxNumber" class="form-control" placeholder="Enter maximum numer range i.e. 50"> 
                            <control-messages [control]="form.controls.maxNumber"></control-messages>
                        </div>

                        <div class="form-group col-xs-12 col-sm-4 col-md-6 col-sm-offset-4">
                            <button type="button" [disabled]="!form.valid" class="btn btn-success" (click)="createQuiz()">Generate Random Quiz</button>
                        </div>

                        <div class="form-group col-xs-12 col-md-12 alert alert-danger" *ngIf="error">{{error}}</div>
                        <div class="form-group col-xs-12 col-md-12 alert alert-success" *ngIf="success">{{success}}</div>
                        
                    </div> <!------------------  END OF DIV ON THE LEFT ------------------------>

                    <div *ngIf="generatePressed" class="form-group col-xs-12 col-md-6">                  
                        <h3 class="text-center">Quiz Created </h3>
                        <p class="text-primary">Summary of the Created Quiz</p>
                        <div class="h4">
                            <div class="form-group col-xs-12 col-md-12">

                                <div *ngFor="let q of this.quiz.questions"> 
                                  <label>Q {{q.id}}</label>:  {{q.num1}} {{q.operator}} {{q.num2}} = {{q.answer}}
                                </div>
                            </div>

                        </div>

                        <div class="form-group col-xs-12 col-md-12">
                            <p>click <strong>Publish Quiz</strong> or Click <strong>Generate Random Quiz</strong> if you would like to re-generate</p>
                        </div>

                        <div class="form-group col-xs-6">
                            <button type="button" [disabled]="!form.valid" class="btn btn-primary" (click)="publishQuiz()">Publish Created Quiz</button>
                         </div>

                    </div> <!------------------  END OF DIV ON THE RIGHT ------------------------>

                </div> <!--  END OF THE ROW -->

            </form>
            {{teacher.id}},
            {{quiz.level}}, {{quiz.operator}}, {{quiz.minNumber}}, {{quiz.maxNumber}}
            
        </div>
    `
})
export class TeacherQuizComponent implements OnInit {

    private generatePressed  : boolean = false;
    private isIn     : boolean  = false;
    private teacher  : Teacher  = new Teacher();
    private quiz     : Quiz     = new Quiz();
    private form     : FormGroup;
    private error    : string  = '';
    private success  : string  = '';
    private numOfQuestion : number = 3;

    private altAdditionWords       = ['+','Plus','Add'];
    private altSubtractionWords    = ['-','Subtract','Minus','take away'];
    private altMultiplicationWords = ['x','Multiply','times'];
    private altDivisionWords       = ['÷','Divide','Divided by'];

    constructor(private teacherService : TeacherService,
                private fb             : FormBuilder,
                private router         : Router) {
                if(this.teacherService.teacher)
                    this.teacher = this.teacherService.teacher;
    }

    randomNumber = () : number => {
        return Math.floor(Math.random()*(this.quiz.maxNumber - this.quiz.minNumber))+1;  
    }
    randomAddOperator = () : string => {
        return this.altAdditionWords[Math.floor(Math.random()*this.altAdditionWords.length)];
    }

    randomSubtractOperator = () : string => {
        return this.altSubtractionWords[Math.floor(Math.random()*this.altSubtractionWords.length)];
    }

    randomMultiplicationOperator = () : string => {
        return this.altMultiplicationWords[Math.floor(Math.random()*this.altMultiplicationWords.length)];
    }

    randomDivisionOperator = () : string => {
        return this.altDivisionWords[Math.floor(Math.random()*this.altDivisionWords.length)];
    }

    createQuiz(){
        if(this.quiz.questions.length > 0){
            this.quiz.questions = [];
        }
        if(this.quiz.minNumber >= this.quiz.maxNumber ){
            this.error = 'Number To should be greater than Number From';
        }
        else {
            this.generatePressed = true; this.error = ''; this.success = '';
           for(let i = 1; i <= this.numOfQuestion; i++) {
                let q = new Question();
               if(this.quiz.operator ==='Addition'){
                   q.create(i, this.randomNumber(),this.randomAddOperator(), this.randomNumber(),null);
                   q.answer=(q.num1+q.num2);
                   this.quiz.insertQuestion(q);
               }

               if(this.quiz.operator ==='Subtraction'){
                   q.create(i, this.randomNumber(),this.randomSubtractOperator(), this.randomNumber(),null);
                   while(q.num1 < q.num2){
                     q.num1=this.randomNumber();q.num2=this.randomNumber();
			        }
                   q.answer=(q.num1-q.num2);
                   this.quiz.insertQuestion(q);
               }

               if(this.quiz.operator ==='Multiplication'){
                   q.create(i, this.randomNumber(),this.randomMultiplicationOperator(), this.randomNumber(),null);
                   q.answer=(q.num1*q.num2);
                   this.quiz.insertQuestion(q);
               }

               if(this.quiz.operator ==='Divison'){
                   q.create(i, this.randomNumber(),this.randomDivisionOperator(), this.randomNumber(),null);
                   while(q.num1 % q.num2 !==0){
                     q.num1=this.randomNumber();q.num2=this.randomNumber();
			        }
                   q.answer=(q.num1/q.num2);
                   this.quiz.insertQuestion(q);
               }

           }//end for loop
           
        }//end else branch
    }

    publishQuiz(){
        this.quiz.datePublished = new Date().toLocaleString();
            this.teacherService
            .publishQuiz(this.quiz)
            .subscribe(r => {
                if(r['quiz'] && r['questions']) {
                    this.success = 'Quiz has been published';
                    this.generatePressed = false;
                }                
            });
    }

    ngOnInit() {
        this.form = this.fb.group({
            "operator"   : [null, Validators.compose([Validators.required])],
            "minNumber"  : [null, Validators.compose([Validators.required,ValidationService.negativeNumcheck, ValidationService.decimalNumcheck])],
            "maxNumber"  : [null, Validators.compose([Validators.required,ValidationService.negativeNumcheck,ValidationService.decimalNumcheck])],
            "level"      : [null, Validators.compose([Validators.required])]           
        });

        this.form.valueChanges
        .map(value => {
            this.quiz.create(null,this.teacher.id,value.level,value.operator,value.minNumber,value.maxNumber,value.datePublished);
            return this.quiz;
        })
        .filter(value => this.form.valid)
        .subscribe(value => value);
        
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