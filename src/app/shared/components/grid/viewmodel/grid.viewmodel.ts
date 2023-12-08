import {KeyValueModel} from "../../../../core/models/common/key-value.model";

export class GridViewmodel {
    public Cells: GridCell[] = [];
    public CellsPerRow: number = 4;
    public MaxRowPerPage: number = 5;
    public CellStyle: CellStyle = CellStyle.Up;
    public GridStyle: string[] = ["5,4", "5,4"];
}

export class GridCell {
    public Title: string;
    public ShortDescription: string;
    public Description: string;
    public Alt: string;
    public ImageUrl: string;
    public Link: string;
    public Prices: (number | undefined)[];
    public PriceNames: string[];
    public PricePermissions : KeyValueModel[];
    public Quantity: string;
    public ShowInImageDialogBox: boolean = true;

    constructor(Title: string, Alt: string, ImageUrl: string, Link: string, ShortDescription: string, Prices: (number | undefined)[], Quantity: string, Description: string,
                PriceNames : string[], PricePermissions : KeyValueModel[], ShowInImageDialogBox: boolean) {
        this.Title = Title;
        this.Alt = Alt;
        this.ImageUrl = ImageUrl;
        this.Link = Link;
        this.ShortDescription = ShortDescription;
        this.Prices = Prices;
        this.Quantity = Quantity;
        this.Description = Description;
        this.PriceNames = PriceNames;
        this.PricePermissions = PricePermissions;
        this.ShowInImageDialogBox = ShowInImageDialogBox;
    }
}

export enum CellStyle {
    Up,
    Down,
    Card,
    CardWithDescription,
    ShopCard
}