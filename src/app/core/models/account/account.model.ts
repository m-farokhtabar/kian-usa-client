export class AccountModel{
    constructor(Token: string, Pages: string[], Buttons: string[]) {
        this.Token = Token;
        this.Pages = Pages;
        this.Buttons = Buttons;
    }
    public Token:string;
    public Pages: string[];
    public Buttons: string[]
}
