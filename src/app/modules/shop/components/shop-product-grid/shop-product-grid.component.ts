import {Component, Input, OnInit, ɵConsole} from '@angular/core';
import {ProductGrpcService} from "../../../../core/services/product-grpc.service";
import {AccountModel} from "../../../../core/models/account/account.model";
import {ProductModel} from "../../../../core/models/product/product.model";
import {CellStyle, GridCell, GridViewmodel} from "../../../../shared/components/grid/viewmodel/grid.viewmodel";
import {Constant} from "../../../../shared/helper/constant";

@Component({
    selector: 'app-shop-product-grid',
    templateUrl: './shop-product-grid.component.html',
    styleUrls: ['./shop-product-grid.component.css']
})
export class ShopProductGridComponent implements OnInit {
    private IsInit: boolean = false;

    private _SelectedGroup: string = "";
    @Input()
    public set SelectedGroup(value: string) {
        this._SelectedGroup = value;
        if (this.IsInit)
            this.LoadData();
    }

    public get SelectedGroup() {
        return this._SelectedGroup;
    }

    private _SelectedTags: string[] = [];

    @Input()
    public set SelectedTags(value: string) {
        if (value != null && value.trim() != "")
            this._SelectedTags = value.split(',');
        else
            this._SelectedTags = [];
        if (this.IsInit)
            this.LoadData();
    }

    public get SelectedTags() {
        return this._SelectedTags.toString();
    }


    _PageNumber: number = 0;
    public get PageNumber() {
        return this._PageNumber;
    }

    @Input()
    public set PageNumber(value: number) {
        this._PageNumber = value;
        if (this.IsInit)
            this.LoadData();
    }

    @Input()
    PageCount: number = 20;
    @Input()
    _CurrentGridStyle: string = "3,2";
    @Input()
    public set CurrentGridStyle(value: string) {
        this._CurrentGridStyle = value;
        if (this.IsInit) {
            const TmpViewModel = new GridViewmodel();
            TmpViewModel.Cells = this.ViewModel.Cells;
            TmpViewModel.CellStyle = this.ViewModel.CellStyle;
            TmpViewModel.GridStyle = this.ViewModel.GridStyle;
            TmpViewModel.CellsPerRow = this.ViewModel.CellsPerRow;
            TmpViewModel.MaxRowPerPage = this.ViewModel.MaxRowPerPage;
            this.ViewModel = TmpViewModel;
        }
    }

    public get CurrentGridStyle() {
        return this._CurrentGridStyle;
    }

    @Input()
    BaseUrl: string = "";
    @Input()
    CurrentShippingType: string = "";

    Products: ProductModel[] = [];
    ViewModel: GridViewmodel = new GridViewmodel();
    TotalProducts: number = 0;

    constructor(private account: AccountModel) {
    }

    ngOnInit(): void {
        this.IsInit = true;
        this.LoadData();
    }

    LoadData() {
        const ProductService = new ProductGrpcService(this.account);
        if (this.SelectedGroup.trim() != "") {
            const Groups = [this.SelectedGroup];
            if (this.PageNumber < 0)
                this.PageNumber = 0;
            ProductService.GetByGroupsTagsWithPaging(Groups, this._SelectedTags, this.PageNumber, this.PageCount).then(data => {
                this.TotalProducts = data.TotalProducts;
                this.Products = data.Products.sort((a, b) => a.Order > b.Order ? 1 : -1);
                const Cells: GridCell[] = [];
                for (let i = 0; i < this.PageNumber * this.PageCount; i++)
                    Cells.push(new GridCell("", "", "", "", "", [],""));
                this.Products.forEach(prd => {
                    const Cell: GridCell = {
                        Title: prd.Name,
                        ShortDescription: prd.ShortDescription,
                        ImageUrl: this.GetImage(prd.ImagesUrls),
                        Link: this.BaseUrl + prd.Slug,
                        Alt: prd.Name + " - " + prd.ShortDescription,
                        Prices: this.GetPrices(prd),
                        Quantity: prd.WHQTY
                    };
                    Cells.push(Cell);
                });

                this.ViewModel = new GridViewmodel();
                this.ViewModel.GridStyle = ["3,2", "2,3"];
                this.ViewModel.CellStyle = CellStyle.ShopCard;
                this.ViewModel.Cells = Cells;
                this.SetGridStyle();
            }).catch(data => {
            })
        }
    }

    private GetImage(ImageUrls: Array<string>): string {
        if (Array.isArray(ImageUrls) && ImageUrls.length > 0) {
            const SortedImageUrls = ImageUrls.sort((a, b) => a.substring(a.lastIndexOf("_")).localeCompare(b.substring(b.lastIndexOf("_"))));
            return Constant.ImageHost + SortedImageUrls[0];
        } else
            return Constant.ImageHost + Constant.DefaultImageFileName;
    }

    private SetGridStyle() {
        this.ViewModel.CellsPerRow = 2;
        this.ViewModel.MaxRowPerPage = 3;
        if (this.CurrentGridStyle != null && this.CurrentGridStyle.trim().length > 0) {
            const Style = this.CurrentGridStyle.split(",");
            if (Array.isArray(Style) && Style.length == 2) {
                this.ViewModel.MaxRowPerPage = +Style[0];
                this.ViewModel.CellsPerRow = +Style[1];
            }
        }
    }

    private GetPrices(Product: ProductModel): (number | undefined)[] {
        const Prices: (number | undefined)[] = [];
        switch (this.CurrentShippingType.trim().toLowerCase()) {
            case "direct-container-from-china":
                Prices.push(Product.Prices[0].Value);
                break;
            case "sacramento-ca-warehouse":
                Prices.push(Product.Prices[1].Value);
                if (Product.Prices.length > 2)
                    Prices.push(Product.Prices[2].Value);
                break;
            case "mixed-container-from-sacramento":
                Prices.push(Product.Prices[3].Value);
                break;
        }
        console.log(Prices);
        console.log(Product);
        console.log(this.SelectedGroup);
        return Prices;
    }

}