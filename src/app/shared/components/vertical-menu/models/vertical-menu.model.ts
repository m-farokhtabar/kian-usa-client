export class VerticalMenuModel {
    public Links: VerticalLinkModel[] = [];
    public Header: string = "";
}

export class VerticalLinkModel {
    public Title: string = "";
    public Page: string = "";
    public Url: string = "";
}