import {Component, Input, OnInit} from '@angular/core';
import {CellStyle, GridCell, GridViewmodel} from "./viewmodel/grid.viewmodel";

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    public GridCells: (GridCell[] | null)[][] = [];
    public ColsPerRow: number = 12;
    public CellTheme: CellStyle = CellStyle.Up;
    public TotalPages: number = 1;

    public TotalItems: number = 0;
    public MaxRowPerPage: number = 0;
    public CellsPerRow: number = 0;
    @Input()
    public CurrentPageIndex: number = 0;
    @Input()
    public PagerBaseLink: string = "";
    @Input()
    public ZoomOnImageWhenMouseOver = false;

    @Input()
    public set Data(value: GridViewmodel) {
        if (value != null && Array.isArray(value.Cells)) {
            this.TotalItems = value.Cells.length;
            this.MaxRowPerPage = value.MaxRowPerPage;
            this.CellsPerRow = value.CellsPerRow;

            this.GridCells = [];
            this.ColsPerRow = 12 / value.CellsPerRow;
            this.CellTheme = value.CellStyle;
            this.TotalPages = Math.ceil(value.Cells.length / (value.CellsPerRow * value.MaxRowPerPage));

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

    constructor() {
    }

    ngOnInit(): void {
    }

    IsThemeUp(): boolean {
        return this.CellTheme === CellStyle.Up
    }

    IsThemeCard(): boolean {
        return this.CellTheme === CellStyle.Card || this.CellTheme === CellStyle.CardWithDescription;
    }

    IsThemeCardWithDescription(): boolean {
        return this.CellTheme === CellStyle.CardWithDescription
    }

    GetPagesIndex() {
        return Array.from({length: this.TotalPages}, (_, i) => i)
    }

    MoveToPage(PageNumber: number) {
        this.CurrentPageIndex = PageNumber;
    }

    CheckForActive(PageIndex: number): boolean {
        if (this.CurrentPageIndex === PageIndex)
            return true;
        else
            return false;
    }

    GetNext(): number {
        if (this.CurrentPageIndex + 1 < this.TotalPages)
            return (this.CurrentPageIndex + 1)
        else
            return -1;
    }

    GetPrev(): number {
        if (this.CurrentPageIndex > 0)
            return (this.CurrentPageIndex - 1);
        else
            return -1;
    }

    MakeInfoAboutCountOfItems(): string {
        const Start = (this.CurrentPageIndex * (this.CellsPerRow * this.MaxRowPerPage)) + 1;
        const End = ((this.CurrentPageIndex + 1) * (this.CellsPerRow * this.MaxRowPerPage)) + 1;
        return Start + " - " + End + " of " + this.TotalItems + " Items";
    }
}
