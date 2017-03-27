import { Component } from '@angular/core';

@Component({
  template: `
    <div class="container-fluid">
      <section class="sample-app-content well">
        <div class="row">
          <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
            <h2>Welcome to mathQuiz.com </h2><br>
            <h4>Please select one of the following</h4>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
            <div class="radio">
              <label><input type="radio" name="optradio" id="teacher" routerLink="/teacher" routerLinkActive="active">I am a teacher</label>
            </div>
            </div>
        </div>

      <div class="row">
        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
          <div class="radio">
            <label><input type="radio" name="optradio" id="student" routerLink="/student" routerLinkActive="active">I am a student</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-xs-12 col-sm-4 col-sm-offset-4">
          <div class="radio">
            <label><input type="radio" name="optradio" id="parent" routerLink="/parent" routerLinkActive="active">I am a parent</label>
          </div>
        </div>
      </div>
    </section>
  </div>
  `
})
export class AppWelcomeComponent {}