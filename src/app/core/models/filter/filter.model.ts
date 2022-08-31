export class FilterModel{

    constructor(Id: string, Name: string, Order: number, Tags: string[]) {
        this.Id = Id;
        this.Name = Name;
        this.Order = Order;
        this.Tags = Tags;
    }

    public Id:string;
    public Name:string;
    public Order:number;
    public Tags:string[];
}