import { NgModule                      } from '@angular/core';
import { RouterModule, Routes          } from '@angular/router';
import { TeacherComponent              } from './teacher.component';
import { TeacherLoginComponent         } from './teacher.login.component';
import { TeacherRegisterComponent      } from './teacher.register.component';
import { TeacherHomeComponent          } from './teacher.home.component';
import { TeacherViewStudentsComponent  } from './teacher.view.students.component';
import { TeacherQuizComponent          } from './teacher.quiz.component';
import { TeacherDashboardComponent     } from './teacher.dashboard.component';
import { TeacherCustomcolourComponent  } from './teacher.customcolour.component';
import { TeacherProfileComponent       } from './teacher.profile.component';
import { TeacherAddStudentComponent    } from './teacher.add.students.component';

import { AuthGuard } from '../services/auth.guard';

const teacherRoutes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        children: [
            { path: 'login',           component: TeacherLoginComponent          },
            { path: 'register',        component: TeacherRegisterComponent       },
            { path: ':id/home',        component: TeacherHomeComponent,          canActivate:[AuthGuard] },
            { path: ':id/add-student', component: TeacherAddStudentComponent,    canActivate:[AuthGuard] },
            { path: ':id/students',    component: TeacherViewStudentsComponent,  canActivate:[AuthGuard] },
            { path: ':id/quiz',        component: TeacherQuizComponent,          canActivate:[AuthGuard] },
            { path: ':id/dashboard',   component: TeacherDashboardComponent,     canActivate:[AuthGuard] },
            { path: ':id/colour',      component: TeacherCustomcolourComponent,  canActivate:[AuthGuard] },
            { path: ':id/profile',     component: TeacherProfileComponent,       canActivate:[AuthGuard] },
            { path: '',                component: TeacherLoginComponent          },
            { path: '**',              component: TeacherLoginComponent          }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(teacherRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TeacherRoutes {}