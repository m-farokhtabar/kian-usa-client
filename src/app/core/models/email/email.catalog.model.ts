export class EmailCatalogModel{
    constructor(CustomerFullName: string, CustomerEmail: string, CategorySlug: string) {
        this.CustomerFullName = CustomerFullName;
        this.CustomerEmail = CustomerEmail;
        this.CategorySlug = CategorySlug;
    }

    public CustomerFullName:string;
    public CustomerEmail:string;
    public CategorySlug:string;
}