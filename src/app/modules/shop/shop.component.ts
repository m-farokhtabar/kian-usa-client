import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";
import {CategoryGrpcService} from "../../core/services/category-grpc.service";
import {CategoryModel} from "../../core/models/category/category.model";
import {Tools} from "../../shared/helper/tools";
import {CellStyle, GridCell, GridViewmodel} from "../../shared/components/grid/viewmodel/grid.viewmodel";
import {Constant} from "../../shared/helper/constant";
import {FilterGrpcService} from "../../core/services/filter-grpc.service";
import {FilterModel} from "../../core/models/filter/filter.model";
import {OrderModel} from "../../core/models/Order/order-model";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
    CategoriesGrid: GridViewmodel = new GridViewmodel();


    Categories: CategoryModel[] = [];
    Filters: FilterModel[] = [];
    SelectedTags: string[] = [];

    ShippingTypes: string[] = ["sacramento-ca-warehouse", "mixed-container-from-sacramento", "direct-container-from-china"];
    CurrentGroup: string = "Categories";
    CurrentGridStyle: string = "4,3";
    CurrentBaseUrl: string = "";
    CurrentPageNumber: number = 0;
    CurrentShippingType: string = "";

    private accSub: Subscription | null = null;

    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("Shop"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.LoadData();
        this.route.queryParams.subscribe(() => {
            this.sharedData.SetMenuStatus(false);
            this.CurrentBaseUrl = this.getBaseUrl();
            this.CurrentGridStyle = this.GetGridStyleByUrl();
            this.CurrentShippingType = this.getShippingType();
            this.SetGroupByUrl();
            this.SetFilter();
            this.SetIndexPager();
            this.FilterCategoriesByTags();
        });
        this.route.params.subscribe(() => {
            this.sharedData.SetMenuStatus(false);
            this.CurrentBaseUrl = this.getBaseUrl();
            this.CurrentGridStyle = this.GetGridStyleByUrl();
            this.CurrentShippingType = this.getShippingType();
            this.SetGroupByUrl();
            this.SetFilter();
            this.SetIndexPager();
            this.FilterCategoriesByTags();
        });
    }

    private LoadData() {
        this.CurrentBaseUrl = this.getBaseUrl();
        this.CurrentGridStyle = this.GetGridStyleByUrl();
        this.CurrentShippingType = this.getShippingType();
        this.SetFilter();
        this.SetIndexPager();
        this.SetGridStyle();
        this.LoadCategories();
        this.LoadTags();
    }

    private SetFilter() {
        const Filter = this.route.snapshot.queryParamMap.get('Filter');
        if (Filter != null && Filter.trim() != "")
            this.SelectedTags = Filter.split(',');
        else
            this.SelectedTags = [];
    }

    private SetIndexPager() {
        const PageNumber = this.route.snapshot.queryParamMap.get('PageNumber');
        if (PageNumber != null)
            this.CurrentPageNumber = (+PageNumber - 1);
        else
            this.CurrentPageNumber = 0;
    }

    private SetGridStyle() {
        const GridStyle = this.GetGridStyleByUrl();
        const Style = GridStyle.split(",");
        if (Array.isArray(Style) && Style.length == 2) {
            this.CategoriesGrid.MaxRowPerPage = +Style[0];
            this.CategoriesGrid.CellsPerRow = +Style[1];
        }
    }

    private GetGridStyleByUrl(): string {
        const GridStyle = this.route.snapshot.queryParamMap.get('GridStyle');
        if (GridStyle != null && GridStyle.trim().length > 0) {
            return GridStyle;
        } else
            return "4,3";
    }


    private LoadCategories() {
        const CategoryService = new CategoryGrpcService(this.account);
        CategoryService.GetWithChildren().then(data => {
            this.Categories = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
            this.FilterCategoriesByTags();
        }).catch(data => {
        })
    }

    private FilterCategoriesByTags() {
        this.SetUrl();

        const Cells: GridCell[] = [];
        this.Categories.forEach(Cat => {
            let Founded = true;
            if (Array.isArray(this.SelectedTags) && this.SelectedTags.length > 0) {
                if (Array.isArray(Cat.Tags) && Cat.Tags.length > 0)
                    this.SelectedTags.forEach(x => Founded = Founded && Cat.Tags.includes(x));
                else
                    Founded = false;
            }
            if (Founded) {
                if (Cat.Children == null || Cat.Children.length === 0) {
                    Cat.ImagesUrl = Tools.SortImageFiles(Cat.ImagesUrl);
                    const Cell: GridCell = {
                        Title: Cat.Name,
                        ShortDescription: Cat.ShortDescription,
                        ImageUrl: this.GetImage(Cat.ImagesUrl),
                        Link: "/price-list/" + Cat.Slug,
                        Alt: Cat.Name + " - " + Cat.ShortDescription,
                        Prices: [],
                        Quantity: "",
                        Description: Cat.Description,
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    };
                    Cells.push(Cell);
                }
            }
        });
        this.CategoriesGrid = new GridViewmodel();
        this.CategoriesGrid.GridStyle = ["4,3", "6,2"];
        this.CategoriesGrid.CellStyle = CellStyle.CardWithDescription;
        this.CategoriesGrid.Cells = Cells;

        this.SetGridStyle();

        // let Filter = "";
        // if (Array.isArray(this.SelectedTags) && this.SelectedTags.length > 0) {
        //     Filter = "&Filter=" + this.SelectedTags.toString();
        // }
        //
        // const Style = this.CategoriesGrid.MaxRowPerPage + "," + this.CategoriesGrid.CellsPerRow;
        //
        // const Url = "/shop/" + this.getShippingType() + "/" + this.CurrentGroup + "/?PageNumber=" + (this.CurrentPageNumber + 1) + Filter + "&GridStyle=" + Style;
        // window.history.replaceState({}, '', Url);

        //const Url = "/shop?PageNumber=" + (this.CurrentPageNumber + 1) + Filter + "&GridStyle=" + Style;

    }

    private getShippingType() {
        return "sacramento-ca-warehouse";
        // let ShippingType = this.route.snapshot.params['shippingType'];
        // if (ShippingType != undefined && ShippingType != null) {
        //     const CurrentShippingType = this.ShippingTypes.find(x => x === ShippingType.toLocaleString());
        //     if (CurrentShippingType != undefined && CurrentShippingType != null) {
        //         return CurrentShippingType;
        //     } else
        //         return this.ShippingTypes[0];
        // } else
        //     return this.ShippingTypes[0];
    }

    private LoadTags() {
        const FilterService = new FilterGrpcService(this.account);
        FilterService.GetAll().then(data => {

            //TODO: Needs Check Group for show
            this.Filters = data.sort((a, b) => a.Order > b.Order ? 1 : -1)
                .filter(x => !Array.isArray(x.Groups) || x.Groups.length == 0 || x.Groups.find(y => y == null || y.trim() == "" || y.trim().toLowerCase() == "shop"));
        }).catch(data => {
        })
    }

    private GetImage(ImageUrls: Array<string>): string {
        if (Array.isArray(ImageUrls) && ImageUrls.length > 0)
            return Constant.ImageHost + ImageUrls[0];
        else
            return Constant.ImageHost + Constant.DefaultImageFileName;
    }

    public OnTagButtonClick(event: any, Tag: string) {
        //event.stopPropagation();
        const idx = this.SelectedTags.indexOf(Tag);
        if (idx === -1)
            this.SelectedTags.push(Tag);
        else
            this.SelectedTags.splice(idx, 1);
        this.CurrentPageNumber = 0;
        this.FilterCategoriesByTags();
    }

    public ClearAllTags() {
        this.SelectedTags = [];
        this.CurrentPageNumber = 0;
        this.FilterCategoriesByTags();
    }

    public IsTagSelected(Tag: string): boolean {
        return this.SelectedTags.includes(Tag);
    }

    public getFilterNames(Tag: string): string {
        let Names: string = "";
        if (Array.isArray(this.Filters)) {
            const Filters = this.Filters.filter(x => x.Tags.includes(Tag));
            if (Array.isArray(Filters)) {
                Filters.forEach(x => Names += x.Name + ",");
                if (Names.length > 0)
                    Names = Names.substring(0, Names.length - 1);
            }
        }
        return Names;
    }

    OnGroupChanged(GroupName: string) {
        this.CurrentGroup = GroupName;
        this.CurrentPageNumber = 0;
        this.SetUrl();
    }

    IsCurrentGroupCategories() {
        return this.CurrentGroup == "Categories";
    }

    SetGroupByUrl() {
        let group = this.route.snapshot.params['group'];
        if (group != null)
            this.CurrentGroup = group;
        else
            this.CurrentGroup = "Categories";
    }

    SetUrl() {
        let Filter = "";
        if (Array.isArray(this.SelectedTags) && this.SelectedTags.length > 0) {
            Filter = "&Filter=" + this.SelectedTags.toString();
        }
        const Style = this.CategoriesGrid.MaxRowPerPage + "," + this.CategoriesGrid.CellsPerRow;
        const Url = this.getBaseUrl() + "?PageNumber=" + (this.CurrentPageNumber + 1) + Filter + "&GridStyle=" + Style;
        window.history.replaceState({}, '', Url);
        this.CurrentBaseUrl = this.getBaseUrl();
    }

    getBaseUrl() {
        //return "/shop/" + this.getShippingType() + "/" + this.CurrentGroup + "/";
        return "/shop/" + this.CurrentGroup + "/";
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}
