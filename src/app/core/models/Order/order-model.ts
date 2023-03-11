export class OrderModel{
    constructor(ProductSlug: string, Count: number, ProductName:string, Price: (number|undefined)[], Pieces: number, Cubes:(number|undefined), Factories: string[],  Weight: (number|undefined)) {
        this.ProductSlug = ProductSlug;
        this.ProductName = ProductName;
        this.Count = Count;
        this.Price = Price;
        this.Pieces = Pieces;
        this.Cubes = Cubes;
        this.Factories = Factories;
        this.Weight = Weight;
    }
    ProductSlug: string;
    ProductName: string;
    Count: number;
    Price: (number|undefined)[];
    Pieces: number;
    Cubes: (number|undefined);
    Factories: string[];
    Weight: (number|undefined);
}