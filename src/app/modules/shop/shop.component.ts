import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {AccountModel} from "../../core/models/account/account.model";
import {Subscription} from "rxjs";
import {CategoryGrpcService} from "../../core/services/category-grpc.service";
import {CategoryModel} from "../../core/models/category/category.model";
import {Tools} from "../../shared/helper/tools";
import {CellStyle, GridCell, GridViewmodel} from "../../shared/components/grid/viewmodel/grid.viewmodel";
import {Constant} from "../../shared/helper/constant";
import {FilterGrpcService} from "../../core/services/filter-grpc.service";
import {FilterModel} from "../../core/models/filter/filter.model";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    CategoriesGrid: GridViewmodel = new GridViewmodel();
    CategoriesIndexPager: number = 0;

    Categories: CategoryModel[] = [];
    Filters: FilterModel[] = [];
    SelectedTags: string[] = [];

    private accSub: Subscription | null = null;

    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AccountModel) {
    }

    ngOnInit(): void {
        this.LoadData();
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "")
                this.router.navigateByUrl('/');
        });

        this.route.params.subscribe(() => {
            this.sharedData.SetMenuStatus(false)
            this.SetIndexPager();
        });
    }

    private LoadData() {
        this.SetFilter();
        this.SetIndexPager();
        this.LoadCategories();
        this.LoadTags();
    }

    private SetFilter() {
        if (this.route.snapshot.params['filter'] != null && this.route.snapshot.params['filter'] != "")
            this.SelectedTags = this.route.snapshot.params['filter'].split(',');
        else
            this.SelectedTags = [];
    }

    private SetIndexPager() {
        if (this.route.snapshot.params['page-index'] != null)
            this.CategoriesIndexPager = (+this.route.snapshot.params['page-index'] - 1);
        else
            this.CategoriesIndexPager = 0;
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
                    console.log(Cat);
                    Cat.ImagesUrl = Tools.SortImageFiles(Cat.ImagesUrl);
                    const Cell: GridCell = {
                        Title: Cat.Name,
                        ShortDescription: Cat.ShortDescription,
                        ImageUrl: this.GetImage(Cat.ImagesUrl),
                        Link: "/shop/" + Cat.Slug,
                        Alt: Cat.Name + " - " + Cat.ShortDescription
                    };
                    Cells.push(Cell);
                }
            }
        });
        this.CategoriesGrid = new GridViewmodel();
        this.CategoriesGrid.CellStyle = CellStyle.CardWithDescription;
        this.CategoriesGrid.CellsPerRow = 2;
        this.CategoriesGrid.MaxRowPerPage = 9;
        this.CategoriesGrid.Cells = Cells;
        window.history.replaceState({}, '', '/shop/' + (this.CategoriesIndexPager + 1) + '/' + this.SelectedTags.toString());
    }

    private LoadTags() {
        const FilterService = new FilterGrpcService(this.account);
        FilterService.GetAll().then(data => {
            this.Filters = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
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
        this.CategoriesIndexPager = 0;
        this.FilterCategoriesByTags();
    }

    public ClearAllTags() {
        this.SelectedTags = [];
        this.CategoriesIndexPager = 0;
        this.FilterCategoriesByTags();
    }

    public IsTagSelected(Tag: string): boolean {
        return this.SelectedTags.includes(Tag);
    }

    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
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
}
