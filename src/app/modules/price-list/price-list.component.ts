import {Component, OnDestroy, OnInit} from '@angular/core'
import {CategoryGrpcService} from "../../core/services/category-grpc.service";
import {CategoryModel} from "../../core/models/category/category.model";
import {ProductModel} from "../../core/models/product/product.model";
import {ProductGrpcService} from "../../core/services/product-grpc.service";
import {ImageSliderModel} from "../../shared/components/image-slider/models/image-slider.model";
import {Tools} from "../../shared/helper/tools";
import {Constant} from "../../shared/helper/constant";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountModel} from "../../core/models/account/account.model";
import {Subscription} from "rxjs";
import {SharedDataService} from "../../core/services/shareddata.service";

@Component({
    selector: 'price-list',
    templateUrl: './price-list.component.html',
    styleUrls: ['./price-list.component.css']
})

export class PriceListComponent implements OnInit, OnDestroy {
    Categories: CategoryModel[] = [];
    Products: ProductModel[][] = [];
    ProductPricesIndex: number[][] = [];
    SliderImages: ImageSliderModel[][] = [];
    DefaultImageSlider: string = Constant.DefaultImageFileName;
    private accSub: Subscription | null = null;
    private RandomNumberForUrl = Math.random();
    JustShowGroupList: boolean = true;


    constructor(private router: Router, private route: ActivatedRoute, private account: AccountModel, private sharedData: SharedDataService) {
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "")
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();
        this.route.params.subscribe(() => {
            this.LoadData();
            this.sharedData.SetMenuStatus(false);
        });
    }

    private LoadData(): void {
        this.RandomNumberForUrl = Math.random();
        this.Products = [];
        this.SliderImages = [];
        this.ProductPricesIndex = [];
        this.Categories = [];

        const CategoryService = new CategoryGrpcService(this.account);
        const ProductService = new ProductGrpcService(this.account);
        const slug = this.route.snapshot.params['slug'];
        if (slug == null || slug.trim() == "") {
            this.JustShowGroupList = true;
            // CategoryService.GetFirst().then(data => {
            //     this.Categories = data;
            //     this.SetCategorySliderImages();
            // });
            // ProductService.GetByFirstCategory().then(data => {
            //     this.Products = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
            //     //this.SetProductsSliderImages();
            //     this.SetProductPricesIndex();
            // });
        } else {
            this.JustShowGroupList = false;
            CategoryService.GetBySlugWithChildren(slug).then(data => {
                this.Categories = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
                if (this.Categories != null && this.Categories.length > 0) {
                    if (this.Categories.length > 1)
                      this.Categories.splice(0, 1);
                    this.SetCategorySliderImages();
                    ProductService.GetByCategoryIds(this.Categories.map(x => x.Id)).then(data => {
                        for (let i = 0; i < this.Categories.length; i++) {
                            this.Products[i] = data.filter(prd => {
                                return prd.CategoryIds.includes(this.Categories[i].Id)
                            });
                            this.Products[i] = this.Products[i].sort((a, b) => a.Order > b.Order ? 1 : -1);
                        }
                        //this.SetProductsSliderImages();
                        this.SetProductPricesIndex();
                    }).catch(data => {});
                }
            });

        }
    }

    private SetCategorySliderImages(): void {
        for (let i = 0; i < this.Categories.length; i++) {
            let Images = this.Categories[i].ImagesUrl;
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
        if (this.Categories[Index] != null && this.Categories[Index].Slug != "")
            return Constant.CatalogAddress + this.Categories[Index].Slug + ".pdf" + "?id=" + this.RandomNumberForUrl;
        return "";
    }

    public GetAllCategoryCatalogUrl(): string {
        return Constant.CatalogAddress + "Catalog.pdf" + "?id=" + this.RandomNumberForUrl;
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}