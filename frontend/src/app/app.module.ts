import { NgModule            } from '@angular/core';
import { HttpModule          } from '@angular/http';
import { FormsModule         } from '@angular/forms';
import { BrowserModule       } from '@angular/platform-browser';

import { AppRoutes           } from './app.routing';
import { AppComponent        } from './app.component';
import { AppWelcomeComponent } from './app.welcome.component';
//import { AlertComponent      } from './alert/alert.component';


@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutes
  ],
  declarations: [
    AppComponent,
    //AlertComponent,
    AppWelcomeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
