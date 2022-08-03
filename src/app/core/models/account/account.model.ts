import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class AccountModel{
    UserToken = new Subject<string>();

    constructor() {
        this.IsValid();
    }

    public IsValid() : boolean{
        const token = this.getToken();
        if  (token == null) {
            this.UserToken.next("");
            return false;
        }
        else {
            this.UserToken.next(token);
            return true;
        }
    }
    public Delete(){
        window.localStorage.removeItem("kianusa_t_u");
        this.UserToken.next("");
    }
    public Set(Token: string){
        window.localStorage.setItem("kianusa_t_u", Token);
        this.UserToken.next(Token);
    }
    public getToken(): string | null{
        return window.localStorage.getItem("kianusa_t_u");
    }
}