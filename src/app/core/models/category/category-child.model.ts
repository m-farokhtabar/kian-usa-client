export class CategoryChildModel{
    public Id:string;
    public Slug:string;
    public Order:number ;

    constructor(Id: string, Slug: string, Order: number) {
        this.Id = Id;
        this.Slug = Slug;
        this.Order = Order;
    }
}