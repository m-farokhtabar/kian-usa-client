import {ProductPriceModel} from "./product-price.model";

export class ProductModel {
    constructor(Id: string, Name: string, Slug: string, Inventory: number, ShortDescription: string, Description: string,
                Prices: Array<ProductPriceModel>, Cube: number, W: number, D: number, H: number, Weight: number, BoxW: number, BoxD: number, BoxH: number,
                Securities: Array<string>, WHQTY: string, Order: number, ImagesUrls: Array<string>, IsGroup: boolean, CategoryIds: string[],
                Tags: string[],Groups: string[],Factories: string[],PiecesCount: number,ComplexItemPieces: string[],ComplexItemPriority : number) {
        this.Id = Id;
        this.Name = Name;
        this.Slug = Slug;
        this.Inventory = Inventory;
        this.ShortDescription = ShortDescription;
        this.Description = Description;
        this.Prices = Prices;
        this.Cube = Cube;
        this.W = W;
        this.D = D;
        this.H = H;
        this.Weight = Weight;
        this.BoxW = BoxW;
        this.BoxD = BoxD;
        this.BoxH = BoxH;
        this.Securities = Securities;
        this.WHQTY = WHQTY;
        this.Order = Order;
        this.ImagesUrls = ImagesUrls;
        this.IsGroup = IsGroup;
        this.CategoryIds = CategoryIds;

        this.Tags = Tags;
        this.Groups = Groups;
        this.Factories = Factories;

        this.PiecesCount = PiecesCount;
        this.ComplexItemPieces = ComplexItemPieces;
        this.ComplexItemPriority = ComplexItemPriority;
    }

    public Id: string;
    public Name: string;
    public Slug: string;
    public Inventory: number | undefined;
    public ShortDescription: string;
    public Description: string;
    public Prices: Array<ProductPriceModel>;
    public Cube: number | undefined;
    public W: number | undefined;
    public D: number | undefined;
    public H: number | undefined;
    public Weight: number | undefined;
    public BoxW: number | undefined;
    public BoxD: number | undefined;
    public BoxH: number | undefined;
    public Securities: Array<string>;
    public WHQTY: string;
    public Order: number;
    public  ImagesUrls: Array<string>;
    /// <summary>
    /// False => means it is a regular product
    /// true => means it is a group of products that have a behaviour like a product
    /// </summary>
    public IsGroup: boolean;
    public CategoryIds: string[];

    public Tags: string[];
    public Groups: string[];
    public Factories: string[];

    public PiecesCount: number;
    public ComplexItemPieces: string[];
    public ComplexItemPriority: number;
}