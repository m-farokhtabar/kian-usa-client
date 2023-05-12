export class EmailAdvancedCatalogModel{
    constructor(CategoriesSlug: string[], Factories: string[], Prices: number[], JustAvailable: boolean, LandedPrice: number, CustomerFullName: string, CustomerEmail: string, IncludeExtraPictures: boolean) {
        this.CategoriesSlug = CategoriesSlug;
        this.Factories = Factories;
        this.Prices = Prices;
        this.JustAvailable = JustAvailable;
        this.LandedPrice = LandedPrice;
        this.CustomerFullName = CustomerFullName;
        this.CustomerEmail = CustomerEmail;
        this.IncludeExtraPictures = IncludeExtraPictures;
    }

    public CategoriesSlug: string[];
    public Factories: string[];
    public Prices: number[];
    public JustAvailable: boolean;
    public LandedPrice: number;
    public CustomerFullName: string;
    public CustomerEmail: string;
    public IncludeExtraPictures: boolean;
}