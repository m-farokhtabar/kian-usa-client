export  class CatalogLandedPriceModel {

    constructor(CatalogSlug: string, Factor: number) {
        this.CatalogSlug = CatalogSlug;
        this.Factor = Factor;
    }

    public CatalogSlug:string;
    public Factor:number;
}