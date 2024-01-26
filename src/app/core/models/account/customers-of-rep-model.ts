export class CustomersOfRepModel{
    public Id:string;
    public Name:string;
    public Family:string;
    public UserName:string;
    public StoreName:string;

    constructor(Id: string, Name: string, Family: string, UserName: string, StoreName: string) {
        this.Id = Id;
        this.Name = Name;
        this.Family = Family;
        this.UserName = UserName;
        this.StoreName = StoreName;
    }
}