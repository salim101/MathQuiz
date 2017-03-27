export class Question {

    public id       : number = 0;
    public num1     : number = 0;
    public operator : string = '';
    public num2     : number = 0;
    public answer   : number = 0;
    
	constructor() {}

	create = (id       : number,
              num1     : number,
              operator : string,
              num2     :  number,
              answer   : number
              ) => {
				this.id       = id;
                this.num1     = num1;
                this.operator = operator;
                this.num2     = num2;
                this.answer   = answer;
			}
}