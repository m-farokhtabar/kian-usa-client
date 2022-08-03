import {Component, Input, OnInit} from '@angular/core';
import {CellStyle, GridCell, GridViewmodel} from "./viewmodel/grid.viewmodel";

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    public GridCells: (GridCell[] | null)[] = [];
    public ColsPerRow: number = 12;
    public CellTheme: CellStyle = CellStyle.Up;

    @Input()
    public set Data(value: GridViewmodel) {
        if (value != null && Array.isArray(value.Cells)) {
            this.CellTheme = value.CellStyle;
            this.ColsPerRow = 12 / value.CellsPerRow;
            this.GridCells = value.Cells.map((val, idx) => {
                if (idx % value.CellsPerRow === 0) {
                    return value.Cells.slice(idx, idx + value.CellsPerRow);
                }
                return null;
            }).filter(e => {
                return e;
            });
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
        return this.CellTheme === CellStyle.Card
    }
}
