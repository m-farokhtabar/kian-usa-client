import { Component, OnInit } from '@angular/core';
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";
import {VerticalMenuModel} from "../../shared/components/vertical-menu/models/vertical-menu.model";
import {MenuHelper} from "../../shared/helper/Menu.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/models/account/auth.service";
import {WhoWeAreBaseComponent} from "../../shared/components/who-we-are/who-we-are-base-component"

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent extends WhoWeAreBaseComponent implements OnInit {

  Content: ParagraphViewmodel = new ParagraphViewmodel("");
  Header: ParagraphViewmodel = new ParagraphViewmodel("<h1 class='bg-light bg-gradient display-5 p-2'>Privacy Policy</h1>");
  VerticalMenu: VerticalMenuModel = MenuHelper.CreateVerticalMenuModelForWhoWeAre();
  private accSub: Subscription | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage("Privacy Policy"))
        this.router.navigateByUrl('/');
    });
    this.account.IsValid();

    this.Content.Content += "<p>Majidi K Inc.--Last Updated: August 1, 2022</p>";
    this.Content.Content += "<p>KIAN USA  a California company (\"KIAN USA \", \"us,\" or \"we\") is strongly committed to protecting the privacy of consumers, clients and visitors. This privacy policy (this \"Policy\"), which applies to the KIAN USA company website (http://www.kianusa.com/, sometimes referred to as our \"Site\") and certain related services (collectively, the “Service”), describes how KIAN USA collects, accesses, uses and discloses information provided by and gathered about users who visit our Site and the choices that users have regarding the use of their information.</p>";
    this.Content.Content += "<p>Each time that you access or use our Site or Service, you agree to be bound by this Policy. If you do not agree to the terms of this Policy, you should discontinue using our Site and Service.</p>";

    this.Content.Content += "<h1 class='h3'>I. INFORMATION WE COLLECT</h1>"
    this.Content.Content += "<p><strong>Personally Identifiable Information</strong> - We will only collect personally identifiable information, such as your name, postal address, telephone number, and e-mail address (collectively, your “Personal Information”) when you actively provide such information, such as when you subscribe to our Site, request information from us, or otherwise communicate with our Site.</p>";
    this.Content.Content += "<p><strong>Cookies</strong> - Where appropriate, including but not limited to pages where we collect e-mail addresses, we may place small files called \"cookies\" on your computer. In order to use our Site, you need to have cookies enabled on your browser. Many Internet services deliver cookies to people who visit their websites in order to make their services more convenient and personalized. When delivered, a cookie helps relate information we have in our database to your browser. Some of this information includes information that you have specifically and knowingly provided to us. Other information may relate to previous activity on our Site. When visiting our Site, we may use a third party service to place a session cookie on your machine to track the effectiveness of our Site. In addition, we may use third-party advertising technology to serve advertisements on search engines and/or when you visit our Site and sites upon which we advertise. This technology uses information about your visit to our Site and the sites upon which we advertise to serve advertisements to you. In the course of serving our advertisements, a unique third-party cookie may be placed or recognized on your browser. We may also use web beacons, provided by our ad serving partner, to help manage our online advertising. These web beacons enable our ad server to recognize a browser's cookie when a browser visits our Site and to learn which advertisements or listings bring users to our Site.</p>";
    this.Content.Content += "<p><strong>Log Files; IP Address</strong> – Our Site's web server, and the web servers of some third party benefit providers, may automatically write files with, at a minimum, the following information: your IP address, request type, file accessed, browser type, referring URL and access time. In some cases, log files may also be used to track other site usage and information about your Site session, including benefits used and purchases made. The information collected by our log files may be linked to your Personal Information.</p>";
    this.Content.Content += "<p><strong>Google Analytics</strong> - We may use a tool called \"Google Analytics\" to collect information about use of our Site. Google Analytics collects information such as how often users visit the Site, what pages they visit when they do so, and what other Web site they visited prior to coming to our Site. We use the information from Google Analytics only to improve our Site. Google Analytics collects only the IP address assigned to you on the date you visit our Site, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Although Google Analytics uses a permanent cookie on your web browser to identify you as a unique user the next time you visit our Site, the cookie cannot be used by anyone but Google. Google's ability to use and share information collected by Google Analytics about your visits to our Site is restricted by the <a target='_blank' href='https://marketingplatform.google.com/about/analytics/terms/us/'>Google Analytics Terms of Use</a> and the <a target='_blank' href='https://policies.google.com/privacy'>Google Privacy Policy</a>. You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies on your browser.</p>";

    this.Content.Content += "<h1 class='h3'>II. HOW WE USE YOUR PERSONAL INFORMATION</h1>"
    this.Content.Content += "<p>We use solid wood where support is needed, and flexible plywood where flexibility is needed.</p>";

    this.Content.Content += "<h1 class='h3'>III. SHARING OF PERSONAL INFORMATION</h1>"
    this.Content.Content += "<p>KIAN USA does not sell, share or disclose personal information about our users and visitors to any outside companies, except as provided for in this Policy.</p>";
    this.Content.Content += "<p>KIAN USA may disclose user personal and non-personal information if (i) we are required to do so by law or regulation, or in the good faith belief that such action is necessary to conform or comply with any legal, regulatory, law enforcement or similar requirement or investigation, (ii) to protect or defend the rights or property of KIAN USA or any other user or (iii) to enforce the KIAN USA Terms of Service.</p>";
    this.Content.Content += "<p>In order to accommodate changes in our business, we may sell all or part of our company, as part of a merger, acquisition, liquidation or bankruptcy. In such event, any information collected on our Site shall be considered an asset of the company and subject to transfer to another company or other companies.</p>";


    this.Content.Content += "<h1 class='h3'>IV. HOW WE PROTECT YOUR INFORMATION</h1>"
    this.Content.Content += "<p>We take commercially reasonable steps to protect personal information provided to us on our Site. These steps are intended to protect against loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no Internet transmission is completely secure or error-free and despite our efforts to protect personal information, there always remains a possibility or risk of unauthorized access.</p>";

    this.Content.Content += "<h1 class='h3'>V. THIRD PARTY LINKS</h1>"
    this.Content.Content += "<p>Our Site may contain links to other web sites. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.</p>";

    this.Content.Content += "<h1 class='h3'>VI. NOTICE REGARDING CHILDREN</h1>"
    this.Content.Content += "<p>We do not knowingly collect any information from anyone under 13 years of age online. Neither our Site nor Service is directed to children under 13 years old. If we learn that we have collected personal information from a child under the age of 13, we will take immediate steps to delete such information from our files.</p>";

    this.Content.Content += "<h1 class='h3'>VII. NOTICE REGARDING INTERNATIONAL USERS</h1>"
    this.Content.Content += "<p>If you are accessing our Site from outside the United States, by providing your information to us, you are consenting to the transfer of your information to the United States for processing and maintenance in accordance with this Policy. You are also consenting to the application of United States law in all matters concerning our Site and Service.</p>";

    this.Content.Content += "<h1 class='h3'>VIII. YOUR CONSENT</h1>"
    this.Content.Content += "<p>By using our Site, you agree to the terms of this Policy. Whenever you submit information via our Site or Service, you consent to the collection, use, and disclosure of that information in accordance with this Policy.</p>";

    this.Content.Content += "<h1 class='h3'>IX. CHANGES TO OUR POLICY</h1>"
    this.Content.Content += "<p>If we decide to change this Policy, we will post any changes on this page and update the Policy modification date above. Your continued use of our Site following any changes to the Policy will constitute your acceptance of such changes.</p>";

    this.Content.Content += "<h1 class='h3'>X. YOUR CALIFORNIA PRIVACY RIGHTS</h1>"
    this.Content.Content += "<p>Under California Civil Code Sections 1798.83-1798.84, California residents are entitled to ask us for a notice describing what categories of personal customer information we share with third parties or corporate affiliates for those third parties or corporate affiliates' direct marketing purposes. That notice will identify the categories of information shared and will include a list of the third parties and affiliates with which it was shared, along with their names and addresses. If you are a California resident and would like a copy of this notice, please submit a written request to the address referenced below, Attn: California Privacy Rights.</p>";

    this.Content.Content += "<h1 class='h3'>XI. ACCESS TO YOUR INFORMATION</h1>"
    this.Content.Content += "<p>Users who have registered for our Site or a sweepstakes offered by our Site may deactivate their account at any time by notifying us using the contact information below. If for any reason you are concerned that the personal information you provided to us is not correct and you cannot change it by accessing your account, or should you wish to have your email address removed from our mailing list please contact us at:</p>";
    this.Content.Content += "<p>KIAN USA</p>";
    this.Content.Content += "<p>4721 Kelton Way</p>";
    this.Content.Content += "<p>Sacramento, CA 95838 </p>";

    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false)
    });
  }
  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
