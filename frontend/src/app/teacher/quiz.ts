import { Question  } from './question';

export class Quiz {
	 public id            : number = 0;
     public teacherID     : number = 0;
     public level         : string = '';
     public operator      : string = '';
	 public minNumber     : number = 0;
     public maxNumber     : number = 0;
     public datePublished : string = '';
     public questions     : Question[] = [];

	constructor() {}

	create = (id             : number,
              teacherID      : number,
              level          : string,
              operator       : string,
			  minNumber      : number,
			  maxNumber      : number,
              datePublished  : string,    
              ) => {
				this.id             = id;
                this.teacherID      = teacherID;
                this.level          = level;
                this.operator       = operator;
				this.minNumber      = minNumber;
				this.maxNumber      = maxNumber; 
                this.datePublished  = datePublished;
			}

    insertQuestion(q) {
        this.questions.push(q);
    }
}