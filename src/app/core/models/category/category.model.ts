import {CategoryParameterModel} from "./category-parameter.model";
import {CategoryChildModel} from "./category-child.model";

export class CategoryModel {
    public Id: string;
    public Name: string;
    public Slug: string;
    public Order: number;
    public ShortDescription: string;
    public Description: string;
    public Parameters: Array<CategoryParameterModel>;
    public Features: Array<CategoryParameterModel>;
    public Children: Array<CategoryChildModel>;
    public ImagesUrl: Array<string>;
    public Tags:Array<string>;
    public Securities:Array<string>;


    constructor(Id: string, Name: string, Slug: string, Order: number, ShortDescription: string, Description: string, Parameters: Array<CategoryParameterModel>, Features: Array<CategoryParameterModel>,
                ImagesUrl: Array<string>, Children: Array<CategoryChildModel>,Tags:Array<string>,Securities:Array<string>) {
        this.Id = Id;
        this.Name = Name;
        this.Slug = Slug;
        this.Order = Order;
        this.ShortDescription = ShortDescription;
        this.Description = Description;
        this.Parameters = Parameters;
        this.Features = Features;
        this.ImagesUrl = ImagesUrl;
        this.Children = Children;
        this.Tags = Tags;
        this.Securities = Securities;
    }
}
