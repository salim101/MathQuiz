import { NgModule                 } from '@angular/core';
import { CommonModule             } from '@angular/common';
import { FormsModule              } from '@angular/forms';
import { ParentRoutes            } from './parent.routing';
import { ParentComponent         } from './parent.component';
import { ParentLoginComponent    } from './parent.login.component';
import { ParentRegisterComponent } from './parent.register.component';
import { ParentHomeComponent     } from './parent.home.component';
import { ParentAddChildComponent } from './parent.add.child.component';
import { ParentViewChildComponent } from './parent.view.child.component';
import { ParentDashboardComponent } from './parent.dashboard.component';
import { ParentService           } from './parent.service';

import { AuthGuard                    } from '../services/auth.guard';
import { AuthenticationService        } from '../services/authentication.service';
//import { AlertComponent               } from '../alert/alert.component';
import { AlertService                 } from '../services/alert.service';
import { ValidationService            } from '../services/validation.service';
//import { ControlMessagesComponent     } from '../alert/control-messages.component';
import { ReactiveFormsModule          } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ParentRoutes,
        ChartsModule
        
    ],
    declarations: [
        ParentComponent,
        ParentLoginComponent,
        ParentRegisterComponent,
        ParentHomeComponent,
        ParentAddChildComponent,
        ParentViewChildComponent,
        ParentDashboardComponent
        
        //AlertComponent,
        //ControlMessagesComponent
    ],
    providers: [
        ParentService,AuthGuard, AuthenticationService,AlertService,ValidationService
    ]
})
export class ParentModule {}