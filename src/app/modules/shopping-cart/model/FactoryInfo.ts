export class FactoryInfo{
    public Name: string;
    public Count: number;

    constructor(Name: string, Count: number) {
        this.Name = Name.toLowerCase();
        this.Count = Count;
    }
}