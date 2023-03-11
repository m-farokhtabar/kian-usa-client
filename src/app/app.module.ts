import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PriceListComponent} from "./modules/price-list/price-list.component";
import {GroupListComponent} from './modules/price-list/components/group-list/group-list.component';
import {ProductDetailsTableComponent} from './modules/price-list/components/product-details-table/product-details-table.component';
import {MoreDetailsTableComponent} from './modules/price-list/components/more-details-table/more-details-table.component';
import {ProductPriceTableComponent} from './modules/price-list/components/product-price-table/product-price-table.component';
import {ImageSliderComponent} from './shared/components/image-slider/image-slider.component';
import {SendProductsCatalogByEmailDialogComponent} from './modules/price-list/components/send-products-catalog-by-email-dialog/send-products-catalog-by-email-dialog.component';
import {FeaturesTableComponent} from './modules/price-list/components/features-table/features-table.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './modules/home/home.component';
import {LoginComponent} from './shared/components/login/login.component'
import {AuthService} from "./core/models/account/auth.service";
import {SharedDataService} from "./core/services/shareddata.service";
import {GridComponent} from './shared/components/grid/grid.component';
import {ParagraphComponent} from './shared/components/paragraph/paragraph.component';
import {AboutUsComponent} from './modules/about-us/about-us.component';
import {VerticalMenuComponent} from './shared/components/vertical-menu/vertical-menu.component';
import {ShippingProgramsComponent} from './modules/shipping-program/shipping-programs.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './modules/contact-us/contact-us.component';
import {VisitUsAtMarketComponent} from './modules/visit-us-at-market/visit-us-at-market.component';
import {ShopComponent} from './modules/shop/shop.component';
import {GroupGridFilterComponent} from './modules/price-list/components/group-grid-filter/group-grid-filter.component';
import { GroupComponent } from './modules/shop/components/group/group.component';
import { ShopProductGridComponent } from './modules/shop/components/shop-product-grid/shop-product-grid.component';
import { PriceListDownloadDialogComponent } from './modules/price-list/components/price-list-download-dialog/price-list-download-dialog.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './modules/shop/components/product-details/product-details.component';
import { HorizontalSliderComponent } from './shared/components/horizontal-slider/horizontal-slider.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'visit-us-at-market', component: VisitUsAtMarketComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'shipping-programs', component: ShippingProgramsComponent},
    {path: 'price-list', children: [{path: "**", component: PriceListComponent}]},
    {path: 'shop', component: ShopComponent},
    //{path: 'shop/:shippingType', component: ShopComponent},
    //{path: 'shop/:shippingType/:group', component: ShopComponent},
    {path: 'shop/:group', component: ShopComponent},
    {path: 'shop/:group/:slug', component: ProductDetailsComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PriceListComponent,
        GroupListComponent,
        ProductDetailsTableComponent,
        MoreDetailsTableComponent,
        ProductPriceTableComponent,
        ImageSliderComponent,
        SendProductsCatalogByEmailDialogComponent,
        FeaturesTableComponent,
        HomeComponent,
        LoginComponent,
        GridComponent,
        ParagraphComponent,
        AboutUsComponent,
        VerticalMenuComponent,
        ShippingProgramsComponent,
        PrivacyPolicyComponent,
        ContactUsComponent,
        VisitUsAtMarketComponent,
        ShopComponent,
        GroupGridFilterComponent,
        GroupComponent,
        ShopProductGridComponent,
        PriceListDownloadDialogComponent,
        ShoppingCartComponent,
        ProductDetailsComponent,
        HorizontalSliderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [AuthService, SharedDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
