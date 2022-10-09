import {Component, Input, OnInit} from '@angular/core';
import {CellStyle, GridCell, GridViewmodel} from "./viewmodel/grid.viewmodel";
import {Tools} from "../../helper/tools";

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    public GridCells: (GridCell[] | null)[][] = [];

    @Input()
    public CurrentPageIndex: number = 0;
    @Input()
    public PagerBaseLink: string = "";
    @Input()
    public ZoomOnImageWhenMouseOver = false;
    @Input()
    public ShowPaging: boolean = false;
    @Input()
    public ExtraQueryParameterName: string | null = null;
    @Input()
    public ExtraQueryParameterValue: string | null = null;
    @Input()
    public IsUseShortDescriptionAsAnAlert = false;
    @Input()
    public TotalItems = 0;


    private _Date: GridViewmodel = new GridViewmodel();

    public get Data(): GridViewmodel {
        return this._Date;
    }

    @Input()
    public set Data(value: GridViewmodel) {
        this._Date = value;
        if (value != null && Array.isArray(value.Cells)) {
            this.GridCells = [];
            const Rows = Math.ceil(value.Cells.length / value.CellsPerRow);
            let Index = 0;
            let PageIndex = 0;
            const CellsPerPage = (value.CellsPerRow * value.MaxRowPerPage);
            for (let i = 0; i < Rows; i++) {
                if (!Array.isArray(this.GridCells[PageIndex])) {
                    this.GridCells[PageIndex] = [];
                }
                this.GridCells[PageIndex].push(value.Cells.slice(Index, Index + value.CellsPerRow));
                Index = Index + value.CellsPerRow;
                if (Index % CellsPerPage === 0)
                    PageIndex++;
            }
        }
    }

    ngOnInit(): void {
    }

    IsThemeUp(): boolean {
        return this.Data.CellStyle === CellStyle.Up
    }

    IsThemeCard(): boolean {
        return this.Data.CellStyle === CellStyle.Card || this.Data.CellStyle === CellStyle.CardWithDescription || this.Data.CellStyle === CellStyle.ShopCard;
    }

    IsThemeCardWithDescription(): boolean {
        return this.Data.CellStyle === CellStyle.CardWithDescription
    }

    IsThemeShopCard() {
        return this.Data.CellStyle === CellStyle.ShopCard
    }

    GetPagesIndex() {
        return Array.from({length: this.GetTotalPages()}, (_, i) => i)
    }

    MoveToPage(PageNumber: number) {
        this.CurrentPageIndex = PageNumber;
    }

    CheckForActive(PageIndex: number): boolean {
        return this.CurrentPageIndex === PageIndex;
    }

    GetNext(): number {
        if (this.CurrentPageIndex + 1 < this.GetTotalPages())
            return (this.CurrentPageIndex + 1);
        else
            return -1;
    }

    GetPrev(): number {
        if (this.CurrentPageIndex > 0)
            return (this.CurrentPageIndex - 1);
        else
            return -1;
    }

    GetTotalPages(): number {
        if (this.TotalItems == 0)
            return Math.ceil(this.Data.Cells.length / (this.Data.CellsPerRow * this.Data.MaxRowPerPage));
        else
            return Math.ceil(this.TotalItems / (this.Data.CellsPerRow * this.Data.MaxRowPerPage));
    }

    MakeInfoAboutCountOfItems(): string {
        const Start = (this.CurrentPageIndex * (this.Data.CellsPerRow * this.Data.MaxRowPerPage)) + 1;
        let End = ((this.CurrentPageIndex + 1) * (this.Data.CellsPerRow * this.Data.MaxRowPerPage));
        if (End > this.Data.Cells.length)
            End = this.Data.Cells.length;
        return Start + " - " + End + " of " + this.Data.Cells.length + " Items";
    }

    ChangeGridStyle(GridStyle: string) {
        if (GridStyle != null && GridStyle.trim().length > 0) {
            const Style = GridStyle.split(",");
            if (Array.isArray(Style) && Style.length == 2) {
                this.Data.MaxRowPerPage = +Style[0];
                this.Data.CellsPerRow = +Style[1];
            }
        }
    }

    public CreateQueryParameter(PageIndex: number, GridStyle: string = ""): any {
        let Style = this.Data.MaxRowPerPage + "," + this.Data.CellsPerRow;
        if (GridStyle != null && GridStyle.trim().length > 0)
            Style = GridStyle;
        if (this.ExtraQueryParameterName == null || this.ExtraQueryParameterValue == null || this.ExtraQueryParameterValue.trim().length == 0)
            return {PageNumber: PageIndex, GridStyle: Style};
        else
            return {
                PageNumber: PageIndex,
                GridStyle: Style,
                [this.ExtraQueryParameterName]: this.ExtraQueryParameterValue
            };
    }

    public GetCurrentPrice(Cell: GridCell) {
        if (Array.isArray(Cell.Prices) && Cell.Prices.length > 0) {
            if (Cell.Prices.length == 1) {
                return Tools.GetPriceFormat(Cell.Prices[0]);
            } else {
                return Tools.GetPriceFormat(Cell.Prices[1]);
            }
        }
        return "";
    }

    public GetFirstPrice(Cell: GridCell) {
        if (Array.isArray(Cell.Prices) && Cell.Prices.length > 0) {
            return Tools.GetPriceFormat(Cell.Prices[0]);
        }
        return "";
    }
    public HasMoreThanOnePrice(Cell: GridCell){
        return Array.isArray(Cell.Prices) && Cell.Prices.length > 1
    }
}
