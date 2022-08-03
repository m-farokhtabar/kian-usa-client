import {ProductModel} from "../models/product/product.model";
import {ProductSrvClient} from "../protos/generated/product/product_pb_service";
import {
    ProductsByCategoryIdsRequestMessage,
    ProductsByCategorySlugRequestMessage,
    ProductsResponseMessage
} from "../protos/generated/product/product_pb";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {ProductPriceModel} from "../models/product/product-price.model";
import {Constant} from "../../shared/helper/constant";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {ServiceHelper} from "./service.helper";
import {AccountModel} from "../models/account/account.model";

export class ProductGrpcService {
    constructor(private account: AccountModel) {
    }
    GetByCategorySlug(categorySlug: string): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductsByCategorySlugRequestMessage();
            request.setCategoryslug(categorySlug);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata!=undefined) {
                client.getByCategorySlug(request, metadata, (error: ServiceError | null, response: ProductsResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getProductsList().map(product => <ProductModel>({
                        BoxD: product.getBoxd(),
                        BoxH: product.getBoxh(),
                        BoxW: product.getBoxw(),
                        Cube: product.getCube(),
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight(),
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        })
                    })));
                });
            }
            else
                alert("Please login.");
        });
    }
    GetByCategoryIds(Ids: string[]): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductsByCategoryIdsRequestMessage();
            request.setCategoryidsList(Ids);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata!=undefined) {
                client.getByCategoryIds(request, metadata, (error: ServiceError | null, response: ProductsResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getProductsList().map(product => <ProductModel>({
                        BoxD: product.getBoxd(),
                        BoxH: product.getBoxh(),
                        BoxW: product.getBoxw(),
                        Cube: product.getCube(),
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight(),
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        }),
                        CategoryIds: product.getCategoryidsList()
                    })));
                });
            }
            else
                alert("Please login.");
        });
    }
    GetByFirstCategory(): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new Empty();
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata!=undefined) {
                client.getByFirstCategory(request, metadata, (error: ServiceError | null, response: ProductsResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getProductsList().map(product => <ProductModel>({
                        BoxD: product.getBoxd(),
                        BoxH: product.getBoxh(),
                        BoxW: product.getBoxw(),
                        Cube: product.getCube(),
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight(),
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        })
                    })));
                });
            }
        });
    }
}