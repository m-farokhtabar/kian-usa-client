import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";
import {VerticalMenuModel} from "../../shared/components/vertical-menu/models/vertical-menu.model";
import {MenuHelper} from "../../shared/helper/Menu.helper";
import {Constant} from "../../shared/helper/constant";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";
import { WhoWeAreBaseComponent } from 'src/app/shared/components/who-we-are/who-we-are-base-component';

@Component({
    selector: 'app-visit-us-at-market',
    templateUrl: './visit-us-at-market.component.html',
    styleUrls: ['./visit-us-at-market.component.css']
})
export class VisitUsAtMarketComponent extends WhoWeAreBaseComponent implements OnInit {

    Content: ParagraphViewmodel = new ParagraphViewmodel("");
    Header: ParagraphViewmodel = new ParagraphViewmodel("<h1 class='bg-light bg-gradient display-5 p-2'>Visit Us at Market</h1>");
    VerticalMenu: VerticalMenuModel = MenuHelper.CreateVerticalMenuModelForWhoWeAre();
    ImagePath: string = Constant.ImageHost + Constant.VisitUsAtMarketImagesUrl;

    private accSub: Subscription | null = null;

    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
        super();
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("Visit Us at Market"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.Content.Content = "<div class='row'>";
        this.Content.Content += "<div class='col-12 col-md-6' style='display: flex;align-items:center;'><div><h3>High Point Market</h3><p class='mb-1 fs-5'>Showroom: Cramco Building</p><p class='fs-5'>243 S. Main St, 3rd Floor</p><h5>High Points Market Dates</h5><p class='mb-1'>Fall: October 22-26, 2022</p><p>Spring: April 22-26, 2023</p></div></div>";
        this.Content.Content += "<div class='col-12 col-md-6'><img class='rounded img-fluid' src='" + this.ImagePath + "visit_us_at_market_high_point_market_cramco_building.jpg'></div>";
        this.Content.Content += "</div>";
        this.Content.Content += "<div class='row pt-5'>";
        this.Content.Content += "<div class='col-12 col-md-6' style='display: flex;align-items:center;'><div><h3>Las Vegas Market</h3><p class='mb-1 fs-5'>Show room temporarily closed</p></div></div>";
        this.Content.Content += "<div class='col-12 col-md-6'><img class='rounded img-fluid' src='" + this.ImagePath + "visit_us_at_market_las_vegas_market.jpg'></div>";
        this.Content.Content += "</div>";
        this.route.params.subscribe(() => {
            this.sharedData.SetMenuStatus(false)
        });
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}
