import { Component, OnInit} from '@angular/core';
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
                        <li><a routerLink="/parent/{{parent.id}}/add-child" routerLinkActive="active">Add Child to Account</a></li>
                        <li class="active"><a routerLink="/parent/{{parent.id}}/view-child" routerLinkActive="active">View Child Details</a></li>
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
                <div class="form-group col-xs-12 col-md-4">
                    <h4 class="text-center">Viewing Childs</h4>
                    <label>Full Name</label>
                    <div id="allStudents" class="pre-scrollable">
                        <ol>
                            <li *ngFor="let student of students; let i = index" (click)="showStudentDetails(i, student)"><button class=" btn btn-link">{{student.firstName}} {{student.lastName}}</button></li>
                        </ol>
                    </div>
                </div><!------------------  END OF DIV ON THE LEFT ------------------------>

                <div *ngIf="studentDetails" class="col-xs-12 col-md-8">
                    <form>
                        <h4 class="text-center">Child Details</h4>
                        <div class="form-group col-xs-12 col-md-6">
                            <label>Child ID:</label>
                            <input type="text" class="form-control" placeholder="Student ID" value="{{students[indx].id}}" > 
                        </div>
                        <div class="form-group col-xs-12 col-md-6">
                            <label>FirstName:</label>
                            <input type="text" class="form-control" placeholder="Student FirstName" value="{{students[indx].firstName}}" > 
                        </div>

                        <div class="form-group col-xs-12 col-md-6">
                            <label>LastName:</label>
                            <input type="text" class="form-control" placeholder="Student LastName" value="{{students[indx].lastName}}"> 
                        </div>

                        <div class="form-group col-xs-12 col-md-6">
                            <label>Level:</label>
                            <input type="text" class="form-control" placeholder="Student Level" value="{{students[indx].level}}"> 
                        </div>

                        <div class="form-group col-xs-12 col-md-6">
                            <label>Userrname:</label>
                            <input type="text" class="form-control" placeholder="Student Level" value="{{students[indx].username}}"> 
                        </div>

                        <div class="form-group col-xs-12 col-md-6">
                            <label>Password:</label>
                            <input type="text" class="form-control" placeholder="Student Level" value="{{students[indx].password}}"> 
                        </div>

                        <div class="form-group col-xs-12 col-md-6">
                            <button type="button" class="btn btn btn-danger" (click)="this.studentDetails=false">Close Student Details</button>
                        </div>
                    </form>
                <div>
        
            </div> <!--  END OF THE ROW -->

        </div> <!--  END OF THE CONTAINER -->

    `,
    styles:[`
		#allStudents {
			height:200px;
		}
	`]
    
  
})

export class ParentViewChildComponent implements OnInit {

    private isIn            : boolean = false;
    private studentDetails  : boolean = false;
    private parent          : Parent = new Parent();
    private students        : Object[];
    private indx            : number = -1;

    constructor(private parentService: ParentService) {
        if(this.parentService.parent)
            this.parent = this.parentService.parent;
            this.parentService
                .getChilds()
                .subscribe(students => this.students = students);
    }

    showStudentDetails(i, student){
        this.studentDetails = true;
        this.indx = i;
    }

    ngOnInit() {}

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