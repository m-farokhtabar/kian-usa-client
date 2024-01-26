import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryGrpcService} from "../../../core/services/category-grpc.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/models/account/auth.service";
import {DownloadAdvancedCatalogModel} from "../../../core/models/catalog/download-advanced-catalog-model";
import {CatalogGrpcService} from "../../../core/services/catalog-grpc.service";
import {Constant} from "../../helper/constant";
import {EmailGrpcService} from "../../../core/services/email-grpc.service";
import {EmailAdvancedCatalogModel} from "../../../core/models/email/email-advanced-catalog-model";

@Component({
    selector: 'advanced-request-catalog',
    templateUrl: './advanced-request-catalog.component.html',
    styleUrls: ['./advanced-request-catalog.component.css']
})
export class AdvancedRequestCatalogComponent implements OnInit  {
    @Input() Type: string = "download";
    @Input()
    public set ResetTrigger(value:number){
        this.Reset();
    }
    @ViewChild('ModelCloseButton') ModelCloseButton: ElementRef | null = null;
    @ViewChild('AdvancedRequestForm') Form: NgForm | null = null;
    @ViewChild('DownloadLink') DownloadLink: ElementRef | null = null;
    public Processing: boolean = false;
    public DownloadLinkIsReady:boolean = false;
    public IsLandedPriceTextBoxEnabled = false;
    public DownloadUrl : string| null = null;
    public Categories = [{id: "", name: ""}];
    //public Factories = [{id: "LY", name: "LY"},{id: "DB", name: "DB"},{id: "KF", name: "KF"}];
    public Factories = [{id: "01", name: "01"},{id: "02", name: "02"},{id: "03", name: "03"},{id: "04", name: "04"}];
    //public Prices= [{id: [0], name: "FOB"},{id: [1,2], name: "Sacramento"},{id: [], name: "LandedPrice"}];
    public Prices= [{id: [0], name: "FOB" , description: ""},{id: [1,2], name: "Sacramento", description: ""},{id: [], name:"Mix Container", description: "Landed"}];
    public CategorySelectedType: number = 0;
    public AvaialbleItemsNeedsToBeDisabled:boolean = true;
    //public CustomText: number = 1;


    constructor(private route: ActivatedRoute, private account: AuthService,private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadCats();
    }

    loadCats(): void {
        const Service = new CategoryGrpcService(this.account);
        Service.GetAllShortData().then(data => {
            if (Array.isArray(data) && data.length > 0) {
                this.Categories = data.map(x => ({
                    id: x.Slug,
                    name: x.Name
                }));
            }
        });
    }
    IfSelectLandedPriceShowTextPrice(data:any) : void{
        if (Array.isArray(data) && data.length>0) {
            if (data.find((x)=>  x.name === "Mix Container" )) { //LandedPrice
                this.IsLandedPriceTextBoxEnabled =  true;
                return
            }
        }
        this.IsLandedPriceTextBoxEnabled =  false;
        return
    }
    public IsFOBPriceSelected(data:any){
        if (Array.isArray(data) && data.length>0) {
            if (data.find((x)=>  x.name === "FOB" )) {
                this.AvaialbleItemsNeedsToBeDisabled =  true;
                return
            }
            this.AvaialbleItemsNeedsToBeDisabled = false;
            return
        }
        this.AvaialbleItemsNeedsToBeDisabled =  true;
        return
    }
    OnSubmit(Form: NgForm) {
        this.DownloadLinkIsReady = false;
        this.DownloadUrl = null;
        if (Form.valid) {
            this.Processing = true;
            console.log(Form.value);
            let SelectedCategories:string[] = [];
            let SelectedFactories:string[] = [];
            let SelectedPrices:number[] = [];
            let JustAvailable = false;
            let LandedPrice = 0;
            let CustomerFullName = Form.value.AdvancedCustomerFullName;
            let CustomerEmail = Form.value.AdvancedCustomerEmail;
            let CustomTextBody = Form.value.CustomTextBody;
            let IncludeExtraPictures = false;            
            if (Array.isArray(Form.value.SelectedCategories) && Form.value.SelectedCategories.length>0)
            {
                Form.value.SelectedCategories.forEach((x:any)=>{
                    SelectedCategories.push(x.id);
                });
            }
            if (Array.isArray(Form.value.SelectedFactories) && Form.value.SelectedFactories.length>0)
            {
                Form.value.SelectedFactories.forEach((x:any)=>{
                    SelectedFactories.push(x.id);
                });
            }
            if (Array.isArray(Form.value.SelectedPrices) && Form.value.SelectedPrices.length>0)
            {
                Form.value.SelectedPrices.forEach((x:any)=>{
                    if (Array.isArray(x.id) && x.id.length>0)
                    {
                        x.id.forEach((y:any)=>{
                            SelectedPrices.push(y);
                        });
                    }

                });
            }
            if (Form.value.AvaialbleItems && Form.value.AvaialbleItems === true)
                JustAvailable = true;
            if (Form.value.LandedPriceValue && Form.value.LandedPriceValue > 0)
                LandedPrice = Form.value.LandedPriceValue;

            if (Form.value.IncludeExtraPictures && Form.value.IncludeExtraPictures === true)
                IncludeExtraPictures = true;

            if (this.Type=='download') {
                const Model = new DownloadAdvancedCatalogModel(SelectedCategories,SelectedFactories,SelectedPrices,JustAvailable,LandedPrice);
                const Service = new CatalogGrpcService(this.account);
                Service.DownloadAdvanceCatalog(Model).then(data => {                    
                    if (data)
                    {
                        this.DownloadUrl = Constant.CatalogAddress + data;
                        this.DownloadLinkIsReady = true;
                    }
                    else
                    {
                        this.DownloadUrl = null;
                        this.DownloadLinkIsReady = false;    
                        alert("this request is not downloadable.");
                    }
                    this.Processing = false;
                    
                }).catch(x => {
                    this.Processing = false;
                    alert("There is a problem to run this operation.");
                });
            }
            else {
                const Model = new EmailAdvancedCatalogModel(SelectedCategories,SelectedFactories,SelectedPrices,JustAvailable,LandedPrice,CustomerFullName, CustomerEmail, CustomTextBody,IncludeExtraPictures);
                const Service = new EmailGrpcService(this.account);
                Service.SendAdvanceCatalog(Model).then(data => {
                    alert("The email has been successfully sent to " + CustomerEmail + ".");
                    this.DownloadUrl = null;
                    this.DownloadLinkIsReady = false;
                    this.Processing = false;
                }).catch(x => {
                    this.Processing = false;
                    alert("There is a problem to run this operation.");
                });
            }
        }
    }
    public OnDownloadButton() {
        this.ModelCloseButton?.nativeElement.click();
        this.Reset();
    }

    Reset(): void {
        this.AvaialbleItemsNeedsToBeDisabled = true;
        this.Processing = false;
        this.DownloadLinkIsReady = false;
        //اگر این کد را نزارم ردیور باتن خالی میشه
        this.CategorySelectedType = 1;
        //this.CustomText = 0;
        this.cd.detectChanges();
        if (this.Form)
            this.Form.resetForm();
        this.CategorySelectedType = 0;
        //this.CustomText = 1;
    }

}
