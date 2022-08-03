import {environment} from "../../../environments/environment";

export class Constant{
    public static readonly ServiceHost: string = environment.ServiceHost;
    public static readonly ImageHost: string = environment.ImageHost;
    public static readonly CatalogAddress: string = environment.CatalogAddress;
    public static readonly FullCatalogFileName: string = environment.FullCatalogFileName;
    public static readonly DefaultImageFileName: string = environment.DefaultImageFileName;
    public static readonly HomeSlider: string = environment.HomeSlider;
    public static readonly HomeGrid: string = environment.HomeGrid;
    public static readonly Logo: string = environment.Logo;
}