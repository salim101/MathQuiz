import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<header><h1>{{title}}</h1></header>
  	<router-outlet></router-outlet>
  	<footer class = "footer"><span>&copy; 2016 / 2017 Salim Uddin</span></footer>
	`,
	styles:[`
		.footer {
			position: fixed; bottom: 0px; width: 100%; height: 25x; font-style: italic; background-color:#E6E6E6; text-indent: 50px;
		}
	`]
})
export class AppComponent {
  private title : string = 'mathQuiz.com';
}
