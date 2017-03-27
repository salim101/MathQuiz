import { NgModule                } from '@angular/core';
import { RouterModule, Routes    } from '@angular/router';
import { ParentComponent         } from './parent.component';
import { ParentLoginComponent    } from './parent.login.component';
import { ParentRegisterComponent } from './parent.register.component';
import { ParentHomeComponent     } from './parent.home.component';
import { ParentAddChildComponent } from './parent.add.child.component';
import { ParentViewChildComponent } from './parent.view.child.component';
import { ParentDashboardComponent } from './parent.dashboard.component';
import { AuthGuard } from '../services/auth.guard';

const parentRoutes: Routes = [
    {
        path: '',
        component: ParentComponent,
        children: [
            { path: 'login',    component: ParentLoginComponent    },
            { path: 'register', component: ParentRegisterComponent },
            { path: ':id/home',      component: ParentHomeComponent,      canActivate:[AuthGuard] },
            { path: ':id/add-child', component: ParentAddChildComponent,  canActivate:[AuthGuard] },
            { path: ':id/view-child',component: ParentViewChildComponent, canActivate:[AuthGuard] },
            { path: ':id/dashboard', component: ParentDashboardComponent, canActivate:[AuthGuard] },
            { path: '',         component: ParentLoginComponent    },
            { path: '**',       component: ParentLoginComponent    }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(parentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ParentRoutes {}