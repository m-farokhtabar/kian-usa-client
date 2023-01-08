export class CustomersOfRepModel{
    public Id:string;
    public Name:string;
    public Family:string;
    public UserName:string;

    constructor(Id: string, Name: string, Family: string, UserName: string) {
        this.Id = Id;
        this.Name = Name;
        this.Family = Family;
        this.UserName = UserName;
    }
}