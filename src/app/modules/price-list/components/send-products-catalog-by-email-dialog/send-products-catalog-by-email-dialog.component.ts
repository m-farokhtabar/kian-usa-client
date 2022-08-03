import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmailGrpcService} from "../../../../core/services/email-grpc.service";
import {EmailCatalogModel} from "../../../../core/models/email/email.catalog.model";
import {Constant} from "../../../../shared/helper/constant";
import {NgForm} from "@angular/forms";
import {AccountModel} from "../../../../core/models/account/account.model";

@Component({
    selector: 'app-send-products-catalog-by-email-dialog',
    templateUrl: './send-products-catalog-by-email-dialog.component.html',
    styleUrls: ['./send-products-catalog-by-email-dialog.component.css']
})
export class SendProductsCatalogByEmailDialogComponent implements OnInit {
    @Input() CategorySlug: string = "";
    @Input() CategoryName: string = "";
    @ViewChild('ModelCloseButton') ModelCloseButton: ElementRef | null = null;
    constructor(private account: AccountModel) {
    }

    ngOnInit(): void {
    }

    OnSubmit(Form: NgForm) {
        if (Form.valid) {
            let Slug = this.CategorySlug;
            if (Form.value.CatalogType == 1)
                Slug = Constant.FullCatalogFileName;
            const Model: EmailCatalogModel = new EmailCatalogModel(Form.value.CustomerFullName, Form.value.CustomerEmail, Slug);
            const EmailService = new EmailGrpcService(this.account);
            const CustomerEmail:string = Form.value.CustomerEmail;
            EmailService.SendCatalog(Model).then(data => {
                this.ModelCloseButton?.nativeElement.click();
                Form.resetForm();
                if (data == false)
                    alert("There is a problem to send an email to "+ CustomerEmail+".");
                else
                    alert("The email has been successfully sent to "+ CustomerEmail+".");
            });
        }
    }
}
