import {ProductModel} from "../models/product/product.model";
import {ProductSrvClient} from "../protos/generated/product/product_pb_service";
import {
    ProductBySlugRequestMessage, ProductResponseMessage,
    ProductsByCategoryIdsRequestMessage,
    ProductsByCategorySlugRequestMessage, ProductsByGroupsTagsWithPagingRequestMessage,
    ProductsResponseMessage, ProductsWithTotalItemsResponseMessage
} from "../protos/generated/product/product_pb";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {ProductPriceModel} from "../models/product/product-price.model";
import {Constant} from "../../shared/helper/constant";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {ServiceHelper} from "./service.helper";
import {AuthService} from "../models/account/auth.service";
import {ProductWithPagingModel} from "../models/product/product-with-paging-model";
import {KeyValueModel} from "../models/common/key-value.model";

export class ProductGrpcService {
    constructor(private account: AuthService) {
    }

    GetBySlug(slug: string) {
        return new Promise<ProductModel>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductBySlugRequestMessage();
            request.setSlug(slug);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.getBySlug(request, metadata, (error: ServiceError | null, response: ProductResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    const prd = response;
                    const Prices = prd.getPricesList().map(price => <ProductPriceModel>{
                        Name: price.getName(),
                        Value: price.getValue()?.getValue()
                    });
                    const features = prd.getFeaturesList().map(Feature => <KeyValueModel>{
                        Name: Feature.getName(),
                        Value: Feature.getValue()
                    });
                    const pricePermission = prd.getPricepermissionsList().map(pricePermission => <KeyValueModel>{
                        Name: pricePermission.getName(),
                        Value: pricePermission.getValue()
                    });
                    return resolve(new ProductModel(prd.getId(), prd.getName(), prd.getSlug(),
                        prd.getInventory() != undefined ? prd.getInventory()!.getValue() : undefined,
                        prd.getShortdescription(), prd.getDescription(), Prices,
                        prd.getCube() != undefined ? prd.getCube()!.getValue() : undefined,
                        prd.getW() != undefined ? prd.getW()!.getValue() : undefined,
                        prd.getD() != undefined ? prd.getD()!.getValue() : undefined,
                        prd.getH() != undefined ? prd.getH()!.getValue() : undefined,
                        prd.getWeight() != undefined ? prd.getWeight()!.getValue() : undefined,
                        prd.getBoxw() != undefined ? prd.getBoxw()!.getValue() : undefined,
                        prd.getBoxd() != undefined ? prd.getBoxd()!.getValue() : undefined,
                        prd.getBoxh() != undefined ? prd.getBoxh()!.getValue() : undefined,
                        prd.getSecuritiesList(), prd.getWhqty(),
                        prd.getOrder(),
                        prd.getImagesurlsList(), prd.getIsgroup(), prd.getCategoryidsList(),
                        prd.getTagsList(), prd.getGroupsList(), prd.getFactoriesList(), prd.getPiecescount(), prd.getComplexitempiecesList(), prd.getComplexitempriority(),
                        prd.getProductdescription(),
                        features,
                        pricePermission, prd.getIssample()));
                });
            } else
                alert("Please login.");
        });
    }

    GetByCategorySlug(categorySlug: string): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductsByCategorySlugRequestMessage();
            request.setCategoryslug(categorySlug);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
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
                        Cube: product.getCube() != undefined ? product.getCube()!.getValue() : undefined,
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight() != undefined ? product.getWeight()!.getValue() : undefined,
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        }),
                        CategoryIds: product.getCategoryidsList(),
                        Tags: product.getTagsList(),
                        Groups: product.getGroupsList(),
                        Factories: product.getFactoriesList(),
                        PiecesCount: product.getPiecescount(),
                        ComplexItemPieces: product.getComplexitempiecesList(),
                        ComplexItemPriority: product.getComplexitempriority(),
                        ProductDescription: product.getProductdescription(),
                        Features: product.getFeaturesList().map(Feature => <KeyValueModel>{
                            Name: Feature.getName(),
                            Value: Feature.getValue()
                        }),
                        PricePermissions : product.getPricepermissionsList().map(pricePermission => <KeyValueModel>{
                            Name: pricePermission.getName(),
                            Value: pricePermission.getValue()
                        }),
                        IsSample: product.getIssample()
                    })));
                });
            } else
                alert("Please login.");
        });
    }

    GetByCategoryIds(Ids: string[]): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductsByCategoryIdsRequestMessage();
            request.setCategoryidsList(Ids);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
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
                        Cube: product.getCube() != undefined ? product.getCube()!.getValue() : undefined,
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight() != undefined ? product.getWeight()!.getValue() : undefined,
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        }),
                        CategoryIds: product.getCategoryidsList(),
                        Tags: product.getTagsList(),
                        Groups: product.getGroupsList(),
                        Factories: product.getFactoriesList(),
                        PiecesCount: product.getPiecescount(),
                        ComplexItemPieces: product.getComplexitempiecesList(),
                        ComplexItemPriority: product.getComplexitempriority(),
                        ProductDescription: product.getProductdescription(),
                        Features: product.getFeaturesList().map(Feature => <KeyValueModel>{
                            Name: Feature.getName(),
                            Value: Feature.getValue()
                        }),
                        PricePermissions : product.getPricepermissionsList().map(pricePermission => <KeyValueModel>{
                            Name: pricePermission.getName(),
                            Value: pricePermission.getValue()
                        }),
                        IsSample: product.getIssample()
                    })));
                });
            } else
                alert("Please login.");

        });
    }

    GetByFirstCategory(): Promise<ProductModel[]> {
        return new Promise<ProductModel[]>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new Empty();
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
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
                        Cube: product.getCube() != undefined ? product.getCube()!.getValue() : undefined,
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight() != undefined ? product.getWeight()!.getValue() : undefined,
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        }),
                        Tags: product.getTagsList(),
                        CategoryIds: product.getCategoryidsList(),
                        Groups: product.getGroupsList(),
                        Factories: product.getFactoriesList(),
                        PiecesCount: product.getPiecescount(),
                        ComplexItemPieces: product.getComplexitempiecesList(),
                        ComplexItemPriority: product.getComplexitempriority(),
                        ProductDescription: product.getProductdescription(),
                        Features: product.getFeaturesList().map(Feature => <KeyValueModel>{
                            Name: Feature.getName(),
                            Value: Feature.getValue()
                        }),
                        PricePermissions : product.getPricepermissionsList().map(pricePermission => <KeyValueModel>{
                            Name: pricePermission.getName(),
                            Value: pricePermission.getValue()
                        }),
                        IsSample: product.getIssample()
                    })));
                });
            } else
                alert("Please login.");
        });
    }

    GetByGroupsTagsWithPaging(Groups: string[], Tags: string[], PageNumber: number, PageCount: number, IsAscOrder: boolean): Promise<ProductWithPagingModel> {
        return new Promise<ProductWithPagingModel>((resolve, reject) => {
            const client = new ProductSrvClient(Constant.ServiceHost);
            const request = new ProductsByGroupsTagsWithPagingRequestMessage();
            request.setGroupsList(Groups);
            request.setTagsList(Tags);
            request.setPagenumber(PageNumber);
            request.setPagecount(PageCount);
            request.setIsacsorder(IsAscOrder);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.getByGroupsTagsWithPaging(request, metadata, (error: ServiceError | null, response: ProductsWithTotalItemsResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    const Products = response.getProductsList().map(product => <ProductModel>({
                        BoxD: product.getBoxd(),
                        BoxH: product.getBoxh(),
                        BoxW: product.getBoxw(),
                        Cube: product.getCube() != undefined ? product.getCube()!.getValue() : undefined,
                        D: product.getD(),
                        Description: product.getDescription(),
                        H: product.getH(),
                        Id: product.getId(),
                        Inventory: product.getInventory(),
                        IsGroup: product.getIsgroup(),
                        WHQTY: product.getWhqty(),
                        ImagesUrls: product.getImagesurlsList(),
                        Securities: product.getSecuritiesList(),
                        Weight: product.getWeight() != undefined ? product.getWeight()!.getValue() : undefined,
                        Slug: product.getSlug(),
                        ShortDescription: product.getShortdescription(),
                        Name: product.getName(),
                        Order: product.getOrder(),
                        W: product.getW(),
                        Prices: product.getPricesList().map(price => <ProductPriceModel>{
                            Name: price.getName(),
                            Value: price.getValue()?.getValue()
                        }),
                        CategoryIds: product.getCategoryidsList(),
                        Tags: product.getTagsList(),
                        Groups: product.getGroupsList(),
                        Factories: product.getFactoriesList(),
                        PiecesCount: product.getPiecescount(),
                        ComplexItemPieces: product.getComplexitempiecesList(),
                        ComplexItemPriority: product.getComplexitempriority(),
                        ProductDescription: product.getProductdescription(),
                        Features: product.getFeaturesList().map(Feature => <KeyValueModel>{
                            Name: Feature.getName(),
                            Value: Feature.getValue()
                        }),
                        PricePermissions : product.getPricepermissionsList().map(pricePermission => <KeyValueModel>{
                            Name: pricePermission.getName(),
                            Value: pricePermission.getValue()
                        }),
                        IsSample: product.getIssample()
                    }));
                    let Result: ProductWithPagingModel = new ProductWithPagingModel(Products, response.getTotalitems());
                    return resolve(Result);
                });
            }
        });
    }
}