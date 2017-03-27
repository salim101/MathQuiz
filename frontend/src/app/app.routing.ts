import { NgModule             } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWelcomeComponent  } from './app.welcome.component';

const appRoutes = [
    { path: 'teacher', loadChildren: 'app/teacher/teacher.module#TeacherModule' },
    { path: 'student', loadChildren: 'app/student/student.module#StudentModule' },
    { path: 'parent',  loadChildren: 'app/parent/parent.module#ParentModule'    },
    { path: 'welcome', component   : AppWelcomeComponent                        },
    { path: '',        component   : AppWelcomeComponent                        },
    { path: '**',      component   : AppWelcomeComponent                        }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutes {}