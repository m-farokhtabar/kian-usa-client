export class EmailCatalogModel{
    constructor(CustomerFullName: string, CustomerEmail: string, CategorySlug: string, WhichPrice: string) {
        this.CustomerFullName = CustomerFullName;
        this.CustomerEmail = CustomerEmail;
        this.CategorySlug = CategorySlug;
        this.WhichPrice = WhichPrice;
    }

    public CustomerFullName:string;
    public CustomerEmail:string;
    public CategorySlug:string;
    public WhichPrice:string;
}