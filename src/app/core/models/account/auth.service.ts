import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AccountModel} from "./account.model";
import {KeyValueModel} from "../common/key-value.model";

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

    public GetFamily(): string | null {
        const token: any = this.GetAccount();
        if (token != null) {
            return token.family_name;
        }
        return null;
    }

    public GetName(): string | null {
        const token: any = this.GetAccount();
        if (token != null) {
            return token.given_name;
        }
        return null;
    }

    public GetId(): string | null {
        const token: any = this.GetAccount();
        if (token != null) {
            return token.nameid;
        }
        return null;
    }

    public GetUserName(): string | null {
        const token: any = this.GetAccount();
        if (token != null) {
            return token.unique_name;
        }
        return null;
    }

    public GetStoreName(): string | null {
        const token: any = this.GetAccount();
        if (token != null) {
            return token.store_name;
        }
        return null;
    }
    public HasPermissionToShowPrice(pricePermissions: KeyValueModel[], priceName: string): boolean {

        const Roles = this.GetRoles();
        if (Roles.includes("Admin"))
            return true;

        if (!priceName)
            return false;

        if (!Array.isArray(pricePermissions) || pricePermissions.length == 0)
            return true;
        const selectedPrice = pricePermissions.find(x => x.Name.toLowerCase() == priceName.toLowerCase());
        if (selectedPrice === undefined)
            return false;

        if (selectedPrice.Value) {
            const permission = selectedPrice.Value.toLowerCase();
            const role = Roles.find(role => {
                return permission.search(role.toLowerCase()) != -1;
            });
            return role !== undefined;
        }
        else
            return true;

        return false;
    }

    public HasPermissionToShow(Securities:Array<string>){
        const Roles = this.GetRoles();
        if (Roles.includes("Admin"))
            return true;
        if (Array.isArray(Securities) && Securities.length>0) {
            const sec = Securities.find(Sec => {
                const role = Roles.find(role => {
                    return role.toLowerCase() == Sec.toLowerCase();
                });
                return role !== undefined;
            });

            return sec !== undefined;
        }
        else
            return true;

    }
    private GetRoles(): string[] {
        const token: any = this.GetAccount();
        if (token != null) {
            if (Array.isArray(token.role))
                return token.role;
            else if (token.role)
                return [token.role];
        }
        return [];
    }

    // public GetPrices(): number[] | null {
    //     const token: any = this.GetAccount();
    //     if (token != null) {
    //         //LandedPrice = 999
    //         if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
    //             return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 999];
    //         if ((Array.isArray(token.role) && token.role.includes("Customer 1")) || (token.role != null && token.role == "Customer 1"))
    //             return [1, 2];
    //         if ((Array.isArray(token.role) && token.role.includes("Customer 2")) || (token.role != null && token.role == "Customer 2"))
    //             return [0, 1, 2, 3, 999];
    //     }
    //     return null;
    // }

    public HasPermissionToShowQuantity(): boolean {
        const token: any = this.GetAccount();
        if (token != null)
            return true;
        else
            return false;
    }

    public HasPermissionToOrder(): boolean {
        return this.HasPermissionToPage("ShoppingCart");
    }

    public HasPermissionToPage(pageName: string): boolean {
        //برای ادمین
        const token: any = this.GetAccount();
        if (token != null) {
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return true;
        }
        if (pageName) {
            const Pages = this.GetPages();
            if (Array.isArray(Pages) && Pages.length > 0) {
                return Pages.find((page) => {
                    return page && page.trim().toLocaleLowerCase() === pageName.trim().toLocaleLowerCase();
                }) !== undefined;
            }
        }
        return false;
    }

    private GetPages(): string[] | null {
        //یعنی کاربرانی که بدون لاگین در سایت هستند صفحات زیر را می توانند بینند
        let allPagesHavePermission: string[] = ['Home', 'Login', 'Logout'];

        const pagesValue = window.localStorage.getItem("kianusa_p_u");
        if (pagesValue) {
            const allPagesOfAllRoles = JSON.parse(pagesValue);
            if (Array.isArray(allPagesOfAllRoles) && allPagesOfAllRoles.length > 0) {
                allPagesOfAllRoles.forEach((pagesOfRole: string) => {
                    const pages: string[] | null = this.getPage(pagesOfRole);
                    if (Array.isArray(pages) && pages.length > 0) {
                        allPagesHavePermission.push.apply(allPagesHavePermission, pages);
                    }
                });
            }
        }
        return allPagesHavePermission;
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

    public HasPermissionToButton(buttonName: string): boolean {
        //برای ادمین
        const token: any = this.GetAccount();
        if (token != null) {
            if ((Array.isArray(token.role) && token.role.includes("Admin")) || (token.role != null && token.role == "Admin"))
                return true;
        }
        if (buttonName) {
            const buttons = this.getButtons();
            if (Array.isArray(buttons) && buttons.length > 0) {
                return buttons.find((button) => {
                    return button && button.trim().toLocaleLowerCase() === buttonName.trim().toLocaleLowerCase();
                }) !== undefined;
            }
        }
        return false;
    }

    private getButtons(): string[] {
        const buttonsValue = window.localStorage.getItem("kianusa_b_u");
        if (buttonsValue) {
            return JSON.parse(buttonsValue);
        }
        return [];
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
        window.localStorage.removeItem("kianusa_p_u");
        window.localStorage.removeItem("kianusa_b_u");
        this.UserToken.next("");
    }

    public Set(model: AccountModel) {
        window.localStorage.setItem("kianusa_t_u", model.Token);
        if (Array.isArray(model.Pages) && model.Pages.length > 0) {
            window.localStorage.setItem("kianusa_p_u", JSON.stringify(model.Pages));
        } else
            window.localStorage.setItem("kianusa_p_u", "");
        if (Array.isArray(model.Buttons) && model.Buttons.length > 0) {
            window.localStorage.setItem("kianusa_b_u", JSON.stringify(model.Buttons));
        } else
            window.localStorage.setItem("kianusa_b_u", "");
        this.UserToken.next(model.Token);
    }

    public getToken(): string | null {
        return window.localStorage.getItem("kianusa_t_u");
    }
}