import { NgModule                     } from '@angular/core';
import { CommonModule                 } from '@angular/common';
import { FormsModule                  } from '@angular/forms';
import { TeacherRoutes                } from './teacher.routing';
import { TeacherComponent             } from './teacher.component';
import { TeacherLoginComponent        } from './teacher.login.component';
import { TeacherRegisterComponent     } from './teacher.register.component';
import { TeacherHomeComponent         } from './teacher.home.component';
import { TeacherProfileComponent      } from './teacher.profile.component';
import { TeacherAddStudentComponent   } from './teacher.add.students.component';
import { TeacherCustomcolourComponent } from './teacher.customcolour.component';
import { TeacherDashboardComponent    } from './teacher.dashboard.component';
import { TeacherQuizComponent         } from './teacher.quiz.component';
import { TeacherViewStudentsComponent } from './teacher.view.students.component';
import { TeacherNavbarComponent       } from './teacher.navbar.component';

import { AuthGuard                    } from '../services/auth.guard';
import { AuthenticationService        } from '../services/authentication.service';
import { AlertComponent               } from '../alert/alert.component';
import { AlertService                 } from '../services/alert.service';
import { ValidationService            } from '../services/validation.service';
import { ControlMessagesComponent     } from '../alert/control-messages.component';

import { TeacherService               } from './teacher.service';
import { ReactiveFormsModule          } from "@angular/forms";
import {ConfirmationPopoverModule     } from '../alert';
import { ChartsModule } from 'ng2-charts';
//import { ChartModule } from 'angular2-chartjs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TeacherRoutes,
        ConfirmationPopoverModule.forRoot({
            focusButton: 'confirm'
        }),
        ChartsModule
    ],
    declarations: [
        TeacherComponent,
        TeacherLoginComponent,
        TeacherRegisterComponent,
        TeacherHomeComponent,
        TeacherProfileComponent,
        TeacherAddStudentComponent,
        TeacherCustomcolourComponent,
        TeacherDashboardComponent,
        TeacherQuizComponent,
        TeacherViewStudentsComponent,
        TeacherNavbarComponent,
        AlertComponent,
        ControlMessagesComponent
    ],
    providers: [
        TeacherService, AuthGuard, AuthenticationService,AlertService,ValidationService
    ]
})
export class TeacherModule {}