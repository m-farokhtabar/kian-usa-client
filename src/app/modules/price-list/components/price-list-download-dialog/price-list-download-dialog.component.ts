import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../../core/models/account/auth.service";
import {FormControl, NgForm} from "@angular/forms";
import {CatalogGrpcService} from "../../../../core/services/catalog-grpc.service";
import {CatalogLandedPriceModel} from "../../../../core/models/catalog/catalog-landed-price.model";
import {Constant} from "../../../../shared/helper/constant";

@Component({
    selector: 'price-list-download-dialog',
    templateUrl: './price-list-download-dialog.component.html',
    styleUrls: ['./price-list-download-dialog.component.css']
})
export class PriceListDownloadDialogComponent implements OnInit {
    @Input() CategorySlug: string = "";
    @Input() CategoryName: string = "";
    @ViewChild('ModelCloseButton') ModelCloseButton: ElementRef | null = null;
    @ViewChild('DownloadLink') DownloadLink: ElementRef | null = null;

    @ViewChild('DownloadForm') Form: NgForm | null = null;
    @ViewChild('CatalogType') CatalogType: FormControl | null = null;
    @ViewChild('Cost') Cost: FormControl | null = null;

    IsLandedPriceSelected: boolean = false;
    SubmitTitleButton: string = "Download";
    private RandomNumberForUrl = Math.random();
    Url: string = "https://localhost:5001/Catalogs/LandedPrices/0/3660-group_0_LandedPrice_5673.pdf?id=0.8624624903582156";
    status: number = 0;

    constructor(private account: AuthService) {
        this.status = 0;
    }

    ngOnInit(): void {
        this.status = 0;
    }

    OnChange(data: Event) {
        this.status = 0;
        this.IsLandedPriceSelected = (<HTMLInputElement>data.target).value == 'L';
        this.SubmitTitleButton = (<HTMLInputElement>data.target).value == 'L' ? "Compute" : "Download";
    }

    OnSubmit(Form: NgForm) {
        if (Form.valid) {
            let Slug = this.CategorySlug;
            if (this.CatalogType!.value == 'L') {
                this.status = 1;
                const Model: CatalogLandedPriceModel = new CatalogLandedPriceModel(Slug, this.Cost!.value);
                const CatalogService = new CatalogGrpcService(this.account);
                CatalogService.CreateCatalogWithLandedPrice(Model).then(data => {
                    //Form.resetForm();
                    if (this.CategorySlug != "All_Cat")
                        this.Url = Constant.CatalogAddress + data[1] + "?id=" + this.RandomNumberForUrl;
                    else
                        this.Url = Constant.CatalogAddress + data[0] + "?id=" + this.RandomNumberForUrl;
                    this.status = 2;
                });
            } else {
                this.status = 0;
                if (this.CategorySlug != "All_Cat")
                    this.CreateLink(Constant.CatalogAddress + this.CatalogType!.value + "/" + this.CategorySlug + "_" + this.CatalogType!.value + ".pdf" + "?id=" + this.RandomNumberForUrl);
                else
                    this.CreateLink(Constant.CatalogAddress + this.CatalogType!.value + "/Catalog_" + this.CatalogType!.value + ".pdf" + "?id=" + this.RandomNumberForUrl);
            }
        }
    }

    private CreateLink(Url: string) {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Url);
        //link.setAttribute('download', `products.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    public OnDownloadButton() {
        this.status = 0;
        this.SubmitTitleButton = "Download";
        this.IsLandedPriceSelected = false;
        this.Form!.resetForm();
        this.ModelCloseButton?.nativeElement.click();
    }

    public OnCostChanged() {
        this.status = 0;
    }
}
