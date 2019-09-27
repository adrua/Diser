
export class loginModel {
    public username: string;
    public password: string;
    public user: string;
    public token: string;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.username = json.username;
            this.password = json.password;
        }
    }
}
