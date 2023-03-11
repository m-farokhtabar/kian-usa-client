import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./core/models/account/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "./core/services/shareddata.service";
import {Constant} from "./shared/helper/constant";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    public AccountIsValid: boolean = false;
    private accSub: Subscription | null = null;
    private MenuSub: Subscription | null = null;
    @ViewChild('NavMainMenuButton') BtnMenu: ElementRef | null = null;
    public IsFixedTopMenu: boolean = true;
    public KianUSALogoUrl = Constant.ImageHost + Constant.Logo + "kian_usa_logo.png";

    constructor(private router: Router, private route: ActivatedRoute, private account: AuthService, private sharedData: SharedDataService, private ch: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            this.AccountIsValid = !acc || acc == "" ? false : true;
        });
        this.MenuSub = this.sharedData.MenuNeedsToBeFixedTop.subscribe(x=>{
            this.IsFixedTopMenu = x;
            this.ch.detectChanges();
        });
        this.account.IsValid();
    }


    title = 'kian-usa-client';

    public OnLogOut(): void {
        this.HideMenu();
        this.account.Delete();
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }

    HideMenu(): void {
        if (this.BtnMenu?.nativeElement.offsetParent != null) {
            this.BtnMenu.nativeElement.click();
        }
    }

    UserAccessToMenu(Menu: string): boolean{
        return this.account.HasPermissionToPage(Menu);
    }
}
