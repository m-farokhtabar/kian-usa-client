export class EmailContactusModel{
    public Name: string;
    public Family:string;
    public Phone:string;
    public Email:string;
    public Comment:string;

    constructor(Name: string, Family: string, Phone: string, Email: string, Comment: string) {
        this.Name = Name;
        this.Family = Family;
        this.Phone = Phone;
        this.Email = Email;
        this.Comment = Comment;
    }
}