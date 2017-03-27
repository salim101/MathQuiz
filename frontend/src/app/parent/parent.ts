export class Parent {
	public id        : number =  0;
	public firstName : string = '';
	public lastName  : string = '';
	public email     : string = '';
	public password  : string = '';

	constructor() {}

	create = (id        : number,
			  firstName : string,
			  lastName  : string,
			  email     : string,
			  password  : string) => {
				this.id        = id;
				this.firstName = firstName;
				this.lastName  = lastName;
				this.email     = email;
				this.password  = password;
			}
}