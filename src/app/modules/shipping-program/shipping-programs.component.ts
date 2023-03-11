import { Component, OnInit } from '@angular/core';
import {VerticalMenuModel} from "../../shared/components/vertical-menu/models/vertical-menu.model";
import {MenuHelper} from "../../shared/helper/Menu.helper";
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'shipping-program',
  templateUrl: './shipping-programs.component.html',
  styleUrls: ['./shipping-programs.component.css']
})
export class ShippingProgramsComponent implements OnInit {
  Content: ParagraphViewmodel = new ParagraphViewmodel("");
  Header: ParagraphViewmodel = new ParagraphViewmodel("<h1 class='bg-light bg-gradient display-5 p-2'>Shipping Programs</h1>");
  VerticalMenu: VerticalMenuModel = MenuHelper.CreateVerticalMenuModelForDealerOnly();
  private accSub: Subscription | null = null;

  constructor(private router: Router,private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
  }

  ngOnInit(): void {

    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage("Shipping Programs"))
        this.router.navigateByUrl('/');
    });
    this.account.IsValid();

    this.Content.Content = "<h1 class='h3'>Direct Container Program</h1>"
    this.Content.Content += "<p>KIAN USA offers an extensive variety of motion upholstery group with a broad assortment of styles available to ship via direct containers. These containers ship from factories located in China, each staffed with a Quality Control Team to ensure an excellent product. To meet the MOQ for the factory, only 2 frames can be mixed in each container evenly. The MOQ to customize the cover’s color or type is 3 containers.</p>";
    this.Content.Content += "<p>We also offer our customers the option to ship on our freight contract, which manages the logistics of your shipment from start to finish. This includes Bookings, Customs Clearance, and Shipping and Delivery Scheduling on your behalf for your convenience. Standard delivery time for direct containers is 90 days.</p>";

    this.Content.Content += "<h1 class='h3'>Mixed Container Program</h1>"
    this.Content.Content += "<p>KIAN USA is proud to offer a quick ship / mixed container program from California. With this shipping program, customers select pre-stocked inventory to order as many items/sets to fit their needs. These mixed containers ship from warehouses in Sacramento.</p>";
    this.Content.Content += "<p>This program has proven to increase a smaller retailer's ability to save more by getting the FOB China price without being limited to only 2 frames in each container and allow larger retailers to turn their inventory faster, and lower their risk to try newer models. Orders can be shipped with in 2 business days after confirmation.</p>";

    this.Content.Content += "<h1 class='h3'>Warehouse Program</h1>"
    this.Content.Content += "<p>We use solid wood where support is needed, and flexible plywood where flexibility is needed.</p>";
    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false)
    });
  }
  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
