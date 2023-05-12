export class DownloadAdvancedCatalogModel{

    constructor(CategoriesSlug: string[], Factories: string[], Prices: number[], JustAvailable: boolean, LandedPrice: number) {
        this.CategoriesSlug = CategoriesSlug;
        this.Factories = Factories;
        this.Prices = Prices;
        this.JustAvailable = JustAvailable;
        this.LandedPrice = LandedPrice;
    }

    public CategoriesSlug: string[];
    public Factories: string[];
    public Prices: number[];
    public JustAvailable: boolean;
    public LandedPrice: number;
}