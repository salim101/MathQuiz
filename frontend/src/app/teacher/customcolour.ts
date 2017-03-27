export class Customcolour {

    public studentId        : string = '';
    public backgroundColour : string = '';
    public fontSize         : string = '';
    
	constructor() {}

	create = (studentId        : string,
              backgroundColour : string,
              fontSize         : string
              ) => {
				this.studentId        = studentId;
                this.backgroundColour = backgroundColour;
                this.fontSize         = fontSize;
			}
}