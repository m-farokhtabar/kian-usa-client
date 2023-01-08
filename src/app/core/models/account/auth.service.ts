import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
    UserToken = new Subject<string>();

    constructor() {
        this.IsValid();
    }

    public GetAccount(): any {
        const helper = new JwtHelperService();
        const token = this.getToken();
        if (token == null) {
            return null;
        } else {
            return helper.decodeToken(token);
        }
    }
    public GetUserName(): string | null{
        const token: any = this.GetAccount();
        if (token != null) {
            return token.unique_name;
        }
        return null;
    }
    public GetPrices() : number[] | null{
        const token: any = this.GetAccount();
        if (token != null) {
            //LandedPrice = 999
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return [0,1,2,3,4,5,6,7,8,9,999];
            if ((Array.isArray(token.role) && token.role.includes("Customer 1")) || (token.role != null && token.role == "Customer 1"))
                return [1,2];
            if ((Array.isArray(token.role) && token.role.includes("Customer 2")) || (token.role != null && token.role == "Customer 2"))
                return [0,1,2,3,999];
        }
        return null;
    }
    public AccessToEmailOneCatOrAllCat() : boolean[]{
        const token: any = this.GetAccount();
        //[AllCat,OneCat]
        if (token != null) {
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return [true,true];
            if ((Array.isArray(token.role) && token.role.includes("Customer 1")) || (token.role != null && token.role == "Customer 1"))
                return [false,false];
            if ((Array.isArray(token.role) && token.role.includes("Customer 2")) || (token.role != null && token.role == "Customer 2"))
                return [false,false];
        }
        return [false,false];
    }
    public AccessToDownloadOneCatOrAllCat() : boolean[]{
        const token: any = this.GetAccount();
        //[AllCat,OneCat]
        if (token != null) {
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return [true,true];
            if ((Array.isArray(token.role) && token.role.includes("Customer 1")) || (token.role != null && token.role == "Customer 1"))
                return [false,false];
            if ((Array.isArray(token.role) && token.role.includes("Customer 2")) || (token.role != null && token.role == "Customer 2"))
                return [false,false];
        }
        return [false,false];
    }

    public GetPages(): string[] | null {
        const token: any = this.GetAccount();
        if (token != null) {
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return ['Home','Shop', 'New Customer', 'Shipping Programs', 'Claim Policy', 'About US', 'Visit Us at Market', 'Privacy Policy', 'Contact US','Where to Shop',"Price List", 'Login', 'Logout'];

            if (token.Page != null) {
                if (Array.isArray(token.Page)) {
                    let Result: string[] = [];
                    token.Page.forEach((x: string) => {
                        const resPage: string[] | null = this.getPage(x);
                        if (Array.isArray(resPage))
                            Result.push.apply(resPage);
                    });
                } else {
                    return this.getPage(token.Page);
                }
            }
        }
        return null;
    }

    private getPage(Page: string): string[] | null {
        const Pages = Page.split(",");
        if (Array.isArray(Pages)) {
            let Result: string[] = [];
            Pages.forEach(x => {
                const IndexOfBracketStart = x.indexOf("[");
                Result.push(x.substring(0, IndexOfBracketStart));
            });
            return Result;
        }
        return null;
    }

    public IsValid(): boolean {
        const token = this.getToken();
        if (token == null) {
            this.UserToken.next("");
            return false;
        } else {
            this.UserToken.next(token);
            return true;
        }
    }

    public Delete() {
        window.localStorage.removeItem("kianusa_t_u");
        this.UserToken.next("");
    }

    public Set(Token: string) {
        window.localStorage.setItem("kianusa_t_u", Token);
        this.UserToken.next(Token);
    }

    public getToken(): string | null {
        return window.localStorage.getItem("kianusa_t_u");
    }
}