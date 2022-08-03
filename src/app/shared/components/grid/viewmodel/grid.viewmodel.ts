export class GridViewmodel {
    public Cells: GridCell[] = [];
    public CellsPerRow: number = 4;
    public MaxRow: number = 5;
    public CellStyle: CellStyle = CellStyle.Up;
}

export class GridCell {
    public Title: string;
    public ShortDescription: string;
    public Alt: string;
    public ImageUrl: string;
    public Link: string;

    constructor(Title: string, Alt: string, ImageUrl: string, Link: string, ShortDescription: string) {
        this.Title = Title;
        this.Alt = Alt;
        this.ImageUrl = ImageUrl;
        this.Link = Link;
        this.ShortDescription = ShortDescription;
    }
}

export enum CellStyle {
    Up,
    Down,
    Card
}