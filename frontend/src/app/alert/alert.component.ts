import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    template: `
        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4"
            *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 
            'alert-danger': message.type === 'error' }">
            {{message.text}}
        </div>
    `
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}