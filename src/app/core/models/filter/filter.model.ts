export class FilterModel{

    constructor(Id: string, Name: string, Order: number, Tags: string[], Groups: string[]) {
        this.Id = Id;
        this.Name = Name;
        this.Order = Order;
        this.Tags = Tags;
        this.Groups = Groups;
    }

    public Id:string;
    public Name:string;
    public Order:number;
    public Tags:string[];
    public Groups:string[];
}