export class HeaderModel {

        registration : {
            name : string, 
            email : string, 
            mobile : number, 
            password : string
        }
        login : {
            email: string,
            password: string,
            userType: number
        }
    constructor() {

        this.login = {
            email:'',
          password:'',
          userType: null  
        }
    }
}
