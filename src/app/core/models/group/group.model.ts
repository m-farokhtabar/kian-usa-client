export class GroupModel{

    constructor(Id: string, Name: string, Order: number, IsVisible: boolean) {
        this.Id = Id;
        this.Name = Name;
        this.Order = Order;
        this.IsVisible = IsVisible;
    }

    public Id:string;
    public Name:string;
    public Order:number;
    public IsVisible:boolean;
}