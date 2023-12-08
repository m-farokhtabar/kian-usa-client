import {Component, Input, OnInit} from '@angular/core';
import {ProductGrpcService} from "../../../../core/services/product-grpc.service";
import {AuthService} from "../../../../core/models/account/auth.service";
import {ProductModel} from "../../../../core/models/product/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../../../core/services/shareddata.service";
import {Constant} from "../../../../shared/helper/constant";
import {OrderModel} from "../../../../core/models/Order/order-model";
import {Tools} from "../../../../shared/helper/tools";
import {ImageSliderModel} from "../../../../shared/components/image-slider/models/image-slider.model";
import {GridCell} from "../../../../shared/components/grid/viewmodel/grid.viewmodel";
import {ShopHelper} from "../../helper/shop-helper";
import {Subscription} from "rxjs";
import {KeyValueModel} from "../../../../core/models/common/key-value.model";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    public Tools:any = Tools;
    DefaultImageSlider: string = Constant.DefaultImageFileName;
    public Product: ProductModel = new ProductModel("", "", "", 0, "", "", [],
        0, 0, 0, 0, 0, 0, 0, 0, [], "", 0, [],
        false, [], [], [], [], 0, [], 0, "", [], []);
    public Group: string = "";
    public Sliders: ImageSliderModel[] = [];

    public RelatedProducts: GridCell[] = [];
    //این رو فقط برای این اضافه کردم که نمایش قسمت اسلایدر پایین درست در بیاد و منطبق باشه با قسمت شاپ که اونم تازه منسخو شده ولی خوب گذاشتیم باشه
    @Input()
    CurrentShippingType: string = "sacramento-ca-warehouse";

    private accSub: Subscription | null = null;
    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("Shop"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.route.params.subscribe(() => {
            this.sharedData.SetMenuStatus(false);
            const slug: string = this.route.snapshot.params['slug'];
            this.Group = this.route.snapshot.params['group'];
            this.LoadData(slug)
        });
    }

    LoadData(slug: string) {
        const productService = new ProductGrpcService(this.account);
        productService.GetBySlug(slug).then(data => {
            if (Array.isArray(data.ImagesUrls) && data.ImagesUrls.length > 1)
                data.ImagesUrls = Tools.SortImageFiles(data.ImagesUrls);
            //بررسی اینکه اگر دسته بندی های محصول فعلی و جدید یک باشد دیگر نرود محصولات دسته بندی ها را دوباره لود کند
            let needsToLoadRelatedProducts:boolean = true;
            if (Tools.CompareTwoStringArrays(this.Product.CategoryIds, data.CategoryIds))
                needsToLoadRelatedProducts = false;
            this.Product = data;
            this.Sliders = this.Product.ImagesUrls.map(x => new ImageSliderModel(x, this.Product.Name + "-" + this.Product.Description));
            if (needsToLoadRelatedProducts)
                this.LoadRelatedProducts();
        }).catch(data => {
        });
    }
    CanShowFeatures(Features : KeyValueModel[]){
        if (Array.isArray(Features) && Features.length>0) {
            const value = Features.find(x => x.Value);
            return value !== undefined;
        }
        return false;
    }
    LoadRelatedProducts(){
        const productService = new ProductGrpcService(this.account);
        productService.GetByCategoryIds(this.Product.CategoryIds).then(data => {
            this.RelatedProducts = [];
            data.forEach(prd => {
                if (Array.isArray(prd.ImagesUrls) && prd.ImagesUrls.length > 1) {
                    prd.ImagesUrls = Tools.SortImageFiles(prd.ImagesUrls);
                }
                const Cell: GridCell = {
                    Title: prd.Name,
                    ShortDescription: prd.ShortDescription,
                    ImageUrl: ShopHelper.GetImage(prd.ImagesUrls),
                    Link: "/shop/" + this.Group + "/" + prd.Slug,
                    Alt: prd.Name + " - " + prd.ShortDescription,
                    Prices: ShopHelper.GetPrices(prd, this.CurrentShippingType),
                    Quantity: prd.WHQTY,
                    Description: prd.Description,
                    PriceNames: ShopHelper.GetPriceNames(prd),
                    PricePermissions: prd.PricePermissions,
                    ShowInImageDialogBox: true
                };
                this.RelatedProducts.push(Cell);
            });

        }).catch(data => {

        });
    }

    AddOrders: OrderModel[] = [];

    OnAddOrders(Orders: OrderModel[]) {
        this.AddOrders = Orders;
    }
    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}
