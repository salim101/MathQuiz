import { Component, OnInit} from '@angular/core';
import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';


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
                        <li class="active"><a routerLink="/teacher/{{teacher.id}}/students" routerLinkActive="active">View Students</a></li>
                        <li><a routerLink="/teacher/{{teacher.id}}/quiz" routerLinkActive="active">Create Quiz</a></li>
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
            <div class="row">
                <div class="form-group col-xs-12 col-md-4">
                    <h3 class="text-center">Viewing Students</h3>
                    <label>Full Name</label>
                    <div id="allStudents" class="pre-scrollable">
                        <ol>
                            <li *ngFor="let student of students; let i = index" (click)="showStudentDetails(i, student)"><button class=" btn btn-link">{{student.firstName}} {{student.lastName}}</button></li>
                        </ol>
                    </div>
                </div><!------------------  END OF DIV ON THE LEFT ------------------------>

                <div *ngIf="studentDetails" class="col-xs-12 col-md-8">
                    <form>
                        <h3 class="text-center">Student Details</h3>
                        <div class="form-group col-xs-12 col-md-6">
                            <label>Student ID:</label>
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

export class TeacherViewStudentsComponent implements OnInit {

    private isIn            : boolean = false;
    private studentDetails  : boolean = false;
    private teacher         : Teacher = new Teacher();
    private students        : Object[];
    private indx            : number = -1;

    constructor(private teacherService: TeacherService) {
        if(this.teacherService.teacher)
            this.teacher = this.teacherService.teacher;
            this.teacherService
                .getStudents()
                .subscribe(students => this.students = students);
    }

    showStudentDetails(i, student){
        this.studentDetails = true;
        this.indx = i;
    }

    ngOnInit() {}

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