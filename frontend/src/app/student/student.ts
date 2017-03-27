export class Student {
	public id        : string = '';
	public teacherID : number = 0;
	public parentID  : number = 0;
	public firstName : string = '';
	public lastName  : string = '';
	public level     : string = '';
	public username  : string = '';
	public password  : string = '';

	constructor() {}

	create = (id        : string,
			  teacherID : number,
			  parentID  : number,
			  firstName : string,
			  lastName  : string,
			  level     : string,
			  username  : string,
			  password  : string) => {
				this.id        = id;
				this.teacherID = teacherID;
				this.parentID  = parentID;
				this.firstName = firstName;
				this.lastName  = lastName;
				this.level     = level;
				this.username  = username;
				this.password  = password;
			}
}