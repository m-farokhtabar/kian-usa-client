export class EmailCatalogWithLandedPriceModel{
    constructor(CustomerFullName: string, CustomerEmail: string, CategorySlug: string, Factor:number) {
        this.CustomerFullName = CustomerFullName;
        this.CustomerEmail = CustomerEmail;
        this.CategorySlug = CategorySlug;
        this.Factor = Factor;
    }

    public CustomerFullName:string;
    public CustomerEmail:string;
    public CategorySlug:string;
    public Factor:number;
}