import { Component, OnInit, OnDestroy } from '@angular/core';
//import { TeacherNavbarComponent       } from './teacher.navbar.component';

@Component ({
    template: `
        <alert></alert>
    	<router-outlet></router-outlet>
    `
})
export class TeacherComponent implements OnInit {

    constructor() {}

    ngOnInit() {}

}