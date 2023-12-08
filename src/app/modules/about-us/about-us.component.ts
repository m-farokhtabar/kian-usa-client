import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {VerticalMenuModel} from "../../shared/components/vertical-menu/models/vertical-menu.model";
import {MenuHelper} from "../../shared/helper/Menu.helper";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";
import { WhoWeAreBaseComponent } from 'src/app/shared/components/who-we-are/who-we-are-base-component';

@Component({
    selector: 'about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent extends WhoWeAreBaseComponent implements OnInit {
    AboutUsContent: ParagraphViewmodel = new ParagraphViewmodel("");
    Header: ParagraphViewmodel = new ParagraphViewmodel("<h1 class='bg-light bg-gradient display-5 p-2'>About <strong>KIAN USA</strong></h1>");
    VerticalMenu: VerticalMenuModel = MenuHelper.CreateVerticalMenuModelForWhoWeAre();
    private accSub: Subscription | null = null;    

    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
        super();
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("About US"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.AboutUsContent.Content = "<p>We are a USA based company that specializes in motion furniture. Our core values are comfort, style, and value.</p>";
        this.AboutUsContent.Content += "<p>We offer our products to our dealers either through direct containers, or our conveniently placed distribution centers.</p>";
        this.AboutUsContent.Content += "<p>The Kian Motion line is made to provide comfort at the highest level.</p>";
        this.AboutUsContent.Content += "<p>Comfort and quality go hand in hand; therefore, we use higher grade materials to build a product we are proud of.\n</p>";
        this.AboutUsContent.Content += "<p>We use solid wood where support is needed, and flexible plywood where flexibility is needed.</p>";
        this.AboutUsContent.Content += "<p>At Kian USA, we believe that we grow with our dealers, so it is important to us to provide the best possible service so that the retailers we work with will grow.</p>";
        this.AboutUsContent.Content += "<p>With Kian, you have an industry partner that is there to support you to grow and succeed.</p>";
        this.route.params.subscribe(() => {
            this.sharedData.SetMenuStatus(false)
        });
    }
    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}
