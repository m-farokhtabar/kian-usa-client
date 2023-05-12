import {Component, OnDestroy, OnInit} from '@angular/core'
import {CategoryGrpcService} from "../../core/services/category-grpc.service";
import {CategoryModel} from "../../core/models/category/category.model";
import {ProductModel} from "../../core/models/product/product.model";
import {ProductGrpcService} from "../../core/services/product-grpc.service";
import {ImageSliderModel} from "../../shared/components/image-slider/models/image-slider.model";
import {Tools} from "../../shared/helper/tools";
import {Constant} from "../../shared/helper/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";
import {SharedDataService} from "../../core/services/shareddata.service";
import {OrderModel} from "../../core/models/Order/order-model";

@Component({
    selector: 'price-list',
    templateUrl: './price-list.component.html',
    styleUrls: ['./price-list.component.css']
})

export class PriceListComponent implements OnInit, OnDestroy {
    Categories: CategoryModel[] = [];
    SelectedCategories: CategoryModel[] = [];
    Products: ProductModel[][] = [];
    ProductPricesIndex: number[][] = [];
    SliderImages: ImageSliderModel[][] = [];
    DefaultImageSlider: string = Constant.DefaultImageFileName;
    private accSub: Subscription | null = null;
    private RandomNumberForUrl = Math.random();
    JustShowGroupList: boolean = true;
    private urlSubscription: Subscription | null = null;
    public openAdvancedRequestDialogForDownloadOrEmail:string = "download";
    public AdvReqCatNeedsToReset = 0;
    public DownloadDialogNeedsToReset = 0;
    public EmailDialogNeedsToReset = 0;

    constructor(private router: Router, private route: ActivatedRoute, public account: AuthService, private sharedData: SharedDataService) {
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("Price List"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.urlSubscription = this.route.url.subscribe((urlSegments) => {
            window.scrollTo(0, 0);
            this.sharedData.SetMenuStatus(false);
            let Slug = "";
            if (Array.isArray(urlSegments) && urlSegments.length > 0)
                Slug = urlSegments[0].path;
            this.LoadData(Slug);
        });
        this.LoadCategories();
    }

    private LoadData(Slug: string): void {
        this.RandomNumberForUrl = Math.random();


        //const CategoryService = new CategoryGrpcService(this.account);
        //const ProductService = new ProductGrpcService(this.account);
        //const slug = this.route.snapshot.params['slug'];
        //const filter = this.route.snapshot.queryParams['Filter'];
        if (Slug == null || Slug.trim() == "") {
            this.JustShowGroupList = true;
        } else {
            this.JustShowGroupList = false;
            this.LoadSelectedCategories(Slug);
            this.LoadSelectedProducts();

            // CategoryService.GetBySlugWithChildren(slug).then(data => {
            //     this.Categories = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
            //     if (this.Categories != null && this.Categories.length > 0) {
            //         if (this.Categories.length > 1)
            //             this.Categories.splice(0, 1);
            //         this.SetCategorySliderImages();
            //         ProductService.GetByCategoryIds(this.Categories.map(x => x.Id)).then(data => {
            //             for (let i = 0; i < this.Categories.length; i++) {
            //                 this.Products[i] = data.filter(prd => {
            //                     return prd.CategoryIds.includes(this.Categories[i].Id)
            //                 });
            //                 this.Products[i] = this.Products[i].sort((a, b) => a.Order > b.Order ? 1 : -1);
            //             }
            //             //this.SetProductsSliderImages();
            //             this.SetProductPricesIndex();
            //         }).catch(data => {
            //         });
            //     }
            // });

        }
    }

    private LoadCategories() {
        const CategoryService = new CategoryGrpcService(this.account);
        CategoryService.GetWithChildren().then(data => {
            this.Categories = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
            let Slug = "";
            if (this.route.snapshot.url != null && this.route.snapshot.url.length > 0)
                Slug = this.route.snapshot.url[0].path;
            this.LoadData(Slug);
        }).catch(data => {
        })
    }

    private LoadSelectedCategories(Param: string) {
        this.SelectedCategories = [];
        this.SliderImages = [];
        let SelectedTags: string[] = [];
        if (Param.toLowerCase().startsWith("?filter=")) {
            SelectedTags = Param.replace("?Filter=", "").split(",");
            if (Array.isArray(SelectedTags) && SelectedTags.length > 0) {
                this.Categories.forEach(Cat => {
                    let Founded = true;
                    if (Array.isArray(Cat.Tags) && Cat.Tags.length > 0)
                        SelectedTags.forEach(x => Founded = Founded && Cat.Tags.includes(x));
                    else
                        Founded = false;
                    if (Founded) {
                        this.SelectedCategories.push(Cat);
                        Cat.Children.forEach(x => {
                            const ChildCat = this.Categories.find(y => y.Slug == x.Slug);
                            if (ChildCat != null)
                                this.SelectedCategories.push(ChildCat);
                        })
                    }
                });
                //Distinct Data
                this.SelectedCategories = this.SelectedCategories.filter(
                    (cat, i, arr) => arr.findIndex(t => t.Slug === cat.Slug) === i);
                this.SelectedCategories = this.SelectedCategories.sort((a, b) => a.Order > b.Order ? 1 : -1);
                this.SetCategorySliderImages();
            }
        } else {
            const SelectedCategory = this.Categories.find(x => x.Slug == Param);
            if (SelectedCategory != null) {
                if (Array.isArray(SelectedCategory.Children) && SelectedCategory.Children.length > 0) {
                    SelectedCategory.Children.forEach(x => {
                        const ChildCat = this.Categories.find(y => y.Slug == x.Slug);
                        if (ChildCat != null)
                            this.SelectedCategories.push(ChildCat);
                    })
                } else {
                    this.SelectedCategories.push(SelectedCategory);
                }
                this.SelectedCategories = this.SelectedCategories.sort((a, b) => a.Order > b.Order ? 1 : -1);
                this.SetCategorySliderImages();
            }
        }
    }

    private LoadSelectedProducts() {
        this.Products = [];
        this.ProductPricesIndex = [];
        const ProductService = new ProductGrpcService(this.account);
        if (Array.isArray(this.SelectedCategories) && this.SelectedCategories.length > 0) {
            ProductService.GetByCategoryIds(this.SelectedCategories.map(x => x.Id)).then(data => {
                for (let i = 0; i < this.SelectedCategories.length; i++) {
                    this.Products[i] = data.filter(prd => {
                        return prd.CategoryIds.includes(this.SelectedCategories[i].Id)
                    });
                    this.Products[i] = this.Products[i].sort((a, b) => a.Order > b.Order ? 1 : -1);
                }
                this.SetProductPricesIndex();
            }).catch(data => {
            });
        }
    }


    private SetCategorySliderImages(): void {
        for (let i = 0; i < this.SelectedCategories.length; i++) {
            let Images = this.SelectedCategories[i].ImagesUrl;
            this.SliderImages[i] = Images.map(ImageUrl => <ImageSliderModel>(new ImageSliderModel(ImageUrl, Tools.GetFileNameWithOutExtensionFromPath(ImageUrl))));
            this.SliderImages[i] = this.SliderImages[i].sort((a, b) => a.Url.substring(a.Url.lastIndexOf("_")).localeCompare(b.Url.substring(b.Url.lastIndexOf("_"))));
        }
    }

    private SetProductsSliderImages(): void {
        for (let i = 0; i < this.Products.length; i++) {
            let Images: string[] = [];
            this.Products[i].forEach(product => {
                Images = Images.concat(product.ImagesUrls);
            });
            this.SliderImages[i] = this.SliderImages[i].concat(Images.map(ImageUrl => <ImageSliderModel>(new ImageSliderModel(ImageUrl, Tools.GetFileNameWithOutExtensionFromPath(ImageUrl)))));
            this.SliderImages[i] = this.SliderImages[i].sort((a, b) => a.Url.substring(a.Url.lastIndexOf("_")).localeCompare(b.Url.substring(b.Url.lastIndexOf("_"))));
        }
    }

    private SetProductPricesIndex(): void {
        this.ProductPricesIndex = [];
        for (let k = 0; k < this.Products.length; k++) {
            this.ProductPricesIndex[k] = [];
            if (this.Products[k] != null && this.Products[k].length > 0) {
                const product = this.Products[k][0];
                if (product.Prices != null && product.Prices.length > 0) {
                    for (let i = 0; i < product.Prices.length; i++) {
                        for (let j = 0; j < this.Products[k].length; j++) {
                            if (this.Products[k][j].Prices[i].Value != null) {
                                //Price 0 and 1 and 2(Discount 1)does need to show
                                if (i>2)
                                    this.ProductPricesIndex[k].push(i);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    public GetCurrentCategoryCatalogUrl(Index: number): string {
        if (this.SelectedCategories[Index] != null && this.SelectedCategories[Index].Slug != "")
            return Constant.CatalogAddress + this.SelectedCategories[Index].Slug + ".pdf" + "?id=" + this.RandomNumberForUrl;
        return "";
    }

    public GetAllCategoryCatalogUrl(): string {
        return Constant.CatalogAddress + "Catalog.pdf" + "?id=" + this.RandomNumberForUrl;
    }

    AddOrders: OrderModel[] = [];
    OnAddOrders(Orders: OrderModel[]){
       this.AddOrders = Orders;
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
        this.urlSubscription?.unsubscribe();
    }
}