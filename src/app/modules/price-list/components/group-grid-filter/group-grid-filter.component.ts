import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../core/models/account/auth.service";
import {CellStyle, GridCell, GridViewmodel} from "../../../../shared/components/grid/viewmodel/grid.viewmodel";
import {Tools} from "../../../../shared/helper/tools";
import {CategoryModel} from "../../../../core/models/category/category.model";
import {FilterModel} from "../../../../core/models/filter/filter.model";
import {FilterGrpcService} from "../../../../core/services/filter-grpc.service";
import {Constant} from "../../../../shared/helper/constant";

@Component({
    selector: 'group-grid-filter',
    templateUrl: './group-grid-filter.component.html',
    styleUrls: ['./group-grid-filter.component.css']
})
export class GroupGridFilterComponent implements OnInit {
    private _Categories: CategoryModel[] = [];
    @Input()
    public set Categories(value: CategoryModel[]) {
        this._Categories = value;
        this.FilterCategoriesByTags();
    }

    public get Categories(): CategoryModel[] {
        return this._Categories;
    }

    CategoriesGrid: GridViewmodel = new GridViewmodel();
    Filters: FilterModel[] = [];
    SelectedTags: string[] = [];

    constructor(private route: ActivatedRoute, private account: AuthService) {
    }

    ngOnInit(): void {
        this.LoadTags();
    }

    private LoadTags() {
        const FilterService = new FilterGrpcService(this.account);
        FilterService.GetAll().then(data => {
            this.Filters = data.sort((a, b) => a.Order > b.Order ? 1 : -1)
                               .filter(x => !Array.isArray(x.Groups) || x.Groups.length == 0 || x.Groups.find(y => y == null || y.trim() == "" || y.trim().toLowerCase() == "price-list"));
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
                Cat.ImagesUrl = Tools.SortImageFiles(Cat.ImagesUrl);
                const Cell: GridCell = {
                    Title: Cat.Name,
                    ShortDescription: Cat.ShortDescription,
                    ImageUrl: this.GetImage(Cat.ImagesUrl),
                    Link: "/price-list/" + Cat.Slug,
                    Alt: Cat.Name + " - " + Cat.ShortDescription,
                    Prices: [],
                    Quantity: "",
                    Description: "",
                    PriceNames: [],
                    PricePermissions: [],
                    ShowInImageDialogBox: true
                };
                Cells.push(Cell);
            }
        });
        if (Array.isArray(this.SelectedTags) && this.SelectedTags.length > 0 && Cells.length > 0) {
            const Cell: GridCell = {
                Title: "All Categories Match With Filters",
                ShortDescription: this.SelectedTags.toString(),
                ImageUrl: Constant.ImageHost + Constant.DefaultImageFileName,
                Link: "/price-list/?Filter=" + this.SelectedTags.toString(),
                Alt: this.SelectedTags.toString(),
                Prices: [],
                Quantity: "",
                Description: "",
                PriceNames: [],
                PricePermissions: [],
                ShowInImageDialogBox: true
            };
            Cells.unshift(Cell);
        }
        this.CategoriesGrid = new GridViewmodel();
        this.CategoriesGrid.GridStyle = ["100,4", "100,4"];
        this.CategoriesGrid.CellStyle = CellStyle.CardWithDescription;
        this.CategoriesGrid.CellsPerRow = 4;
        this.CategoriesGrid.MaxRowPerPage = 100;
        this.CategoriesGrid.Cells = Cells;
    }

    private GetImage(ImageUrls: Array<string>): string {
        if (Array.isArray(ImageUrls) && ImageUrls.length > 0)
            return Constant.ImageHost + ImageUrls[0];
        else
            return Constant.ImageHost + Constant.DefaultImageFileName;
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

    public OnTagButtonClick(event: any, Tag: string) {
        const idx = this.SelectedTags.indexOf(Tag);
        if (idx === -1)
            this.SelectedTags.push(Tag);
        else
            this.SelectedTags.splice(idx, 1);
        this.FilterCategoriesByTags();
    }

    public ClearAllTags() {
        this.SelectedTags = [];
        this.FilterCategoriesByTags();
    }

    public IsTagSelected(Tag: string): boolean {
        return this.SelectedTags.includes(Tag);
    }
}