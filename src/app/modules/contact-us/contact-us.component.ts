import {Component, OnInit} from '@angular/core';
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";
import {VerticalMenuModel} from "../../shared/components/vertical-menu/models/vertical-menu.model";
import {MenuHelper} from "../../shared/helper/Menu.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailGrpcService} from "../../core/services/email-grpc.service";
import {EmailContactusModel} from "../../core/models/email/email.contactus.model";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    public SentSuccessfully: boolean = false;
    public ContactForm: FormGroup;
    Header: ParagraphViewmodel = new ParagraphViewmodel("<h1 class='bg-light bg-gradient display-5 p-2'>Contact US</h1>");
    VerticalMenu: VerticalMenuModel = MenuHelper.CreateVerticalMenuModelForWhoWeAre();
    private accSub: Subscription | null = null;

    constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private fb: FormBuilder, private account: AuthService) {
        this.ContactForm = this.fb.group({
            Name: ["", [Validators.required, Validators.maxLength(100)]],
            Family: ["", [Validators.required, Validators.maxLength(100)]],
            Phone: ["", [Validators.maxLength(12), Validators.pattern("[0-9]{3}[\- ][0-9]{3}[\- ][0-9]{4}")]],
            Email: ["", [Validators.required, Validators.email, Validators.maxLength(200)]],
            Comment: ["", [Validators.required, Validators.maxLength(1500)]]
        });
    }

    ngOnInit(): void {
        this.accSub = this.account.UserToken.subscribe(acc => {
            if (!acc || acc == "" || !this.account.HasPermissionToPage("Contact US"))
                this.router.navigateByUrl('/');
        });
        this.account.IsValid();

        this.route.params.subscribe(() => {
            if (this.SentSuccessfully) {
                this.ContactForm.reset();
                this.SentSuccessfully = false;
            }
            this.sharedData.SetMenuStatus(false);
        });
    }

    public OnSubmit() {
        if (this.ContactForm.valid) {
            const Data = this.ContactForm.value;
            const Model: EmailContactusModel = new EmailContactusModel(Data.Name, Data.Family, Data.Phone, Data.Email, Data.Comment);
            const EmailService = new EmailGrpcService(this.account);
            EmailService.SendContactUs(Model).then(data => {
                this.ContactForm.reset();
                this.SentSuccessfully = data;
                if (data == false)
                    alert("There is a problem to send your request.");
            });
        }
    }

    public get Name(): AbstractControl | null {
        return this.ContactForm.get("Name");
    }

    public get Family() {
        return this.ContactForm.get("Family");
    }

    public get Phone() {
        return this.ContactForm.get("Phone");
    }

    public get Email() {
        return this.ContactForm.get("Email");
    }

    public get Comment() {
        return this.ContactForm.get("Comment");
    }
    ngOnDestroy(): void {
        this.accSub?.unsubscribe();
    }
}
