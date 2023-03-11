import {Constant} from "../../../shared/helper/constant";
import {ProductModel} from "../../../core/models/product/product.model";

export class ShopHelper {
    public static GetImage(ImageUrls: Array<string>): string {
        if (Array.isArray(ImageUrls) && ImageUrls.length > 0) {
            const SortedImageUrls = ImageUrls.sort((a, b) => a.substring(a.lastIndexOf("_")).localeCompare(b.substring(b.lastIndexOf("_"))));
            return Constant.ImageHost + SortedImageUrls[0];
        } else
            return Constant.ImageHost + Constant.DefaultImageFileName;
    }

    public static GetPrices(Product: ProductModel, CurrentShippingType: string): (number | undefined)[] {
        const Prices: (number | undefined)[] = [];
        switch (CurrentShippingType.trim().toLowerCase()) {
            case "direct-container-from-china":
                Prices.push(Product.Prices[0].Value);
                break;
            case "sacramento-ca-warehouse":
                Prices.push(Product.Prices[1].Value);
                if (Product.Prices.length > 2)
                    Prices.push(Product.Prices[2].Value);
                break;
            case "mixed-container-from-sacramento":
                Prices.push(Product.Prices[3].Value);
                break;
        }
        return Prices;
    }

    public static GetPriceNames(Product: ProductModel) : string[]{
        if (Array.isArray(Product.Prices) && Product.Prices.length>0)
            return Product.Prices.map(x=> x.Name);
        else
            return [];
    }
}