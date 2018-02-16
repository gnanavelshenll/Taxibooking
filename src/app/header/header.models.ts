//Header Bar Model
export class LoginModel {
    
    //Model for login form
    public login : {
        email: string,
        password: string,
        usertype: number
    }
    constructor() {
        this.login = {
            email:'',
        password:'',
        usertype: null  
        };    
    }
}

export class RegistrationModel {
    //Model for registration form
    public registration : {
        name:string,
        email: string,
        phone: number,
        gender: string,
        password: string,
        confirmPassword: string,
        type:number
    }
    constructor(){
        this.registration = {
            name:'',
            email:'',
            phone:null,
            gender:'',
            password:'',
            confirmPassword:'',
            type:null
        }
    }
}

