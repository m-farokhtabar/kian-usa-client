import {CategoryDetailsShortModel} from "../models/category/category-details-short.model";
import {grpc} from "@improbable-eng/grpc-web";
import {CategorySrv} from "../protos/generated/category/category_pb_service";
import {
    CategoriesResponseMessage,
    CategoriesShortDataResponseMessage, CategoryBySlugRequestMessage, CategoryByTagsRequestMessage,
    CategoryParameterResponseMessage,
    CategoryResponseMessage, ChildrenCategoryResponseMessage
} from "../protos/generated/category/category_pb";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {CategoryModel} from "../models/category/category.model";
import {CategoryParameterModel} from "../models/category/category-parameter.model";
import {Constant} from "../../shared/helper/constant";
import {AuthService} from "../models/account/auth.service";
import {ServiceHelper} from "./service.helper";
import {CategoryChildModel} from "../models/category/category-child.model";

export class CategoryGrpcService {
    constructor(private account: AuthService) {
    }

    GetByFilter(Tags: string[]): Promise<CategoryModel[]> {
        const request = new CategoryByTagsRequestMessage();
        request.setTagsList(Tags);
        return new Promise<CategoryModel[]>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetByFilter, {
                request: request,
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoriesResponseMessage.AsObject;

                        if (result != null) {
                            const categories = result.categoriesList.map(x=> <CategoryModel>{
                                Id: x.id,
                                Name: x.name,
                                Slug: x.slug,
                                Order: x.order,
                                ShortDescription: x.shortdescription,
                                Description: x.description,
                                Parameters: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.parametersList),
                                Features: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.featuresList),
                                ImagesUrl: x.imagesurlList,
                                Children: this.ChildrenCategoryResponseMessageMapToCategoryChildModel(x.childrenList),
                                Tags:x.tagsList,
                                Securities: x.securitiesList
                            });
                            return resolve(categories);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }
    GetWithChildren(): Promise<CategoryModel[]> {
        return new Promise<CategoryModel[]>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetAllWithChildren, {
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoriesResponseMessage.AsObject;

                        if (result != null) {
                            const categories = result.categoriesList.map(x=> <CategoryModel>{
                                Id: x.id,
                                Name: x.name,
                                Slug: x.slug,
                                Order: x.order,
                                ShortDescription: x.shortdescription,
                                Description: x.description,
                                Parameters: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.parametersList),
                                Features: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.featuresList),
                                ImagesUrl: x.imagesurlList,
                                Children: this.ChildrenCategoryResponseMessageMapToCategoryChildModel(x.childrenList),
                                Tags:x.tagsList,
                                Securities: x.securitiesList
                            });
                            return resolve(categories);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }
    GetAllShortData(): Promise<CategoryDetailsShortModel[]> {
        return new Promise<CategoryDetailsShortModel[]>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetAllShortData, {
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoriesShortDataResponseMessage.AsObject;
                        const shortCategories = result.categoriesList.map(categoryShort =>
                            <CategoryDetailsShortModel>({
                                Id: categoryShort.id,
                                Name: categoryShort.name,
                                Order: categoryShort.order,
                                ShortDescription: categoryShort.shortdescription,
                                Slug: categoryShort.slug
                            }));
                        return resolve(shortCategories);
                    }
                    else
                        return reject();
                }
            });
        });
    }
    GetFirst(): Promise<CategoryModel> {
        return new Promise<CategoryModel>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetFirst, {
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoryResponseMessage.AsObject;

                        if (result != null) {
                            let Category = new CategoryModel(result.id, result.name, result.slug, result.order, result.shortdescription, result.description,
                                this.CategoryParameterResponseMessageMapToCategoryParameterModel(result.parametersList),
                                this.CategoryParameterResponseMessageMapToCategoryParameterModel(result.featuresList),
                                result.imagesurlList,
                                this.ChildrenCategoryResponseMessageMapToCategoryChildModel(result.childrenList),
                                result.tagsList,
                                result.securitiesList);
                            return resolve(Category);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }

    GetBySlug(slug: string): Promise<CategoryModel> {
        if (slug == null || slug.trim() == "")
            return new Promise<CategoryModel>((resolve, reject) => {return reject});
        const request:CategoryBySlugRequestMessage =  new CategoryBySlugRequestMessage();
        request.setSlug(slug.trim());
        return new Promise<CategoryModel>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetBySlug, {
                request: request,
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoryResponseMessage.AsObject;

                        if (result != null) {
                            let Category = new CategoryModel(result.id, result.name, result.slug, result.order, result.shortdescription, result.description,
                                this.CategoryParameterResponseMessageMapToCategoryParameterModel(result.parametersList),
                                this.CategoryParameterResponseMessageMapToCategoryParameterModel(result.featuresList),
                                result.imagesurlList,
                                this.ChildrenCategoryResponseMessageMapToCategoryChildModel(result.childrenList),
                                result.tagsList,
                                result.securitiesList);
                            return resolve(Category);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }

    GetBySlugWithChildren(slug: string): Promise<CategoryModel[]> {
        if (slug == null || slug.trim() == "")
            return new Promise<CategoryModel[]>((resolve, reject) => {return reject});
        const request:CategoryBySlugRequestMessage =  new CategoryBySlugRequestMessage();
        request.setSlug(slug.trim());
        return new Promise<CategoryModel[]>((resolve, reject) =>{
            grpc.unary(CategorySrv.GetBySlugWithChildren, {
                request: request,
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as CategoriesResponseMessage.AsObject;

                        if (result != null) {
                            const categories = result.categoriesList.map(x=> <CategoryModel>{
                                Id: x.id,
                                Name: x.name,
                                Slug: x.slug,
                                Order: x.order,
                                ShortDescription: x.shortdescription,
                                Description: x.description,
                                Parameters: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.parametersList),
                                Features: this.CategoryParameterResponseMessageMapToCategoryParameterModel(x.featuresList),
                                ImagesUrl: x.imagesurlList,
                                Children: this.ChildrenCategoryResponseMessageMapToCategoryChildModel(x.childrenList),
                                Tags:x.tagsList,
                                Securities:x.securitiesList
                            });
                            return resolve(categories);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }

    CategoryParameterResponseMessageMapToCategoryParameterModel(Parameters : Array<CategoryParameterResponseMessage.AsObject> ): CategoryParameterModel[]
    {
        return Parameters.map(param => <CategoryParameterModel>{
            Name: param.name,
            Value: param.value
        });
    }
    ChildrenCategoryResponseMessageMapToCategoryChildModel(Children: Array<ChildrenCategoryResponseMessage.AsObject>){
        return Children.map(param => <CategoryChildModel>{
            Id: param.id,
            Slug: param.slug,
            Order: param.order
        });
    }



}