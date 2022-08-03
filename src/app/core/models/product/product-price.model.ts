export class ProductPriceModel {
    public Name: string;
    public Value: number | undefined;

    constructor(Name: string, Value: number) {
        this.Name = Name;
        this.Value = Value;
    }
}