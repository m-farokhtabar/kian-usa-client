export class CategoryDetailsShortModel {
    constructor(Id: string, Name: string, Slug: string, Order: number, ShortDescription: string) {
        this.Id = Id;
        this.Name = Name;
        this.Slug = Slug;
        this.Order = Order;
        this.ShortDescription = ShortDescription;
    }
    public Id: string;
    public Name: string;
    public Slug: string;
    public Order: number;
    public ShortDescription: string;
}