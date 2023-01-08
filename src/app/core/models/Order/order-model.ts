export class OrderModel{
    constructor(ProductId: string, Count: number, ProductName:string, Price: (number|undefined)[], Pieces: number, Cubes:(number|undefined)) {
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Count = Count;
        this.Price = Price;
        this.Pieces = Pieces;
        this.Cubes = Cubes;
    }
    ProductId: string;
    ProductName: string;
    Count: number;
    Price: (number|undefined)[];
    Pieces: number;
    Cubes: (number|undefined);
}