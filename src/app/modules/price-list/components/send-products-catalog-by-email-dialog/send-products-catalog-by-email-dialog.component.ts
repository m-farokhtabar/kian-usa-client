import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmailGrpcService} from "../../../../core/services/email-grpc.service";
import {EmailCatalogModel} from "../../../../core/models/email/email.catalog.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../core/models/account/auth.service";
import {EmailCatalogWithLandedPriceModel} from "../../../../core/models/email/email-catalog-with-landed-price.model";

@Component({
    selector: 'app-send-products-catalog-by-email-dialog',
    templateUrl: './send-products-catalog-by-email-dialog.component.html',
    styleUrls: ['./send-products-catalog-by-email-dialog.component.css']
})
export class SendProductsCatalogByEmailDialogComponent implements OnInit {
    @Input()
    public set ResetTrigger(value:number){
        this.SendingEmail = false;
        this.IsLandedPriceSelected = false;
        if (this.Form)
            this.Form!.resetForm();
    }

    @Input() CategorySlug: string = "";
    @Input() CategoryName: string = "";
    @ViewChild('ModelCloseButton') ModelCloseButton: ElementRef | null = null;
    @ViewChild('DownloadForm') Form: NgForm | null = null;
    IsLandedPriceSelected: boolean = false;
    SendingEmail = false;

    constructor(private account: AuthService) {
    }

    ngOnInit(): void {
    }

    OnChange(data: Event) {
        this.IsLandedPriceSelected = (<HTMLInputElement>data.target).value == 'L';
    }

    OnSubmit(Form: NgForm) {
        if (Form.valid) {
            this.SendingEmail = true;
            let Slug = this.CategorySlug;
            // if (Form.value.CatalogType == 1)
            //     Slug = Constant.FullCatalogFileName;
            if (Form.value.CatalogType != 'L') {
                let Model: EmailCatalogModel;
                if (this.CategorySlug != "All_Cat")
                    Model = new EmailCatalogModel(Form.value.CustomerFullName, Form.value.CustomerEmail, Slug, Form.value.CatalogType);
                else
                    Model = new EmailCatalogModel(Form.value.CustomerFullName, Form.value.CustomerEmail, "Catalog", Form.value.CatalogType);

                const EmailService = new EmailGrpcService(this.account);
                const CustomerEmail: string = Form.value.CustomerEmail;
                EmailService.SendCatalog(Model).then(data => {
                    this.ModelCloseButton?.nativeElement.click();
                    Form.resetForm();
                    this.SendingEmail = false;
                    if (data == false)
                        alert("There is a problem to send an email to " + CustomerEmail + ".");
                    else
                        alert("The email has been successfully sent to " + CustomerEmail + ".");
                });
            } else {

                let Model: EmailCatalogWithLandedPriceModel;
                if (this.CategorySlug != "All_Cat")
                    Model = new EmailCatalogWithLandedPriceModel(Form.value.CustomerFullName, Form.value.CustomerEmail, Slug, Form.value.Cost);
                else
                    Model = new EmailCatalogWithLandedPriceModel(Form.value.CustomerFullName, Form.value.CustomerEmail, "Catalog", Form.value.Cost);
                const EmailService = new EmailGrpcService(this.account);
                const CustomerEmail: string = Form.value.CustomerEmail;
                EmailService.SendCatalogWithLandedPrice(Model).then(data => {
                    this.ModelCloseButton?.nativeElement.click();
                    Form.resetForm();
                    this.SendingEmail = false;
                    if (data == false)
                        alert("There is a problem to send an email to " + CustomerEmail + ".");
                    else
                        alert("The email has been successfully sent to " + CustomerEmail + ".");
                });
            }
        }
    }
}
