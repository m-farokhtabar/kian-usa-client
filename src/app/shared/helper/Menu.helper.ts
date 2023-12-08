import {VerticalMenuModel} from "../components/vertical-menu/models/vertical-menu.model";

export class MenuHelper{
    public static  CreateVerticalMenuModelForWhoWeAre(): VerticalMenuModel{
        return {
            Header: "<h4 class='pt-4'>About Us</h4>",
            Links: [
                {
                    Title: "About US",
                    Page: "About US",
                    Url: "/about-us"
                },
                {
                    Title: "Visit Us at Market",
                    Page: "Visit Us at Market",
                    Url: "/visit-us-at-market"
                },
                {
                    Title: "Privacy Policy",
                    Page: "Privacy Policy",
                    Url: "/privacy-policy"
                },
                {
                    Title: "Contact US",
                    Page: "Contact US",
                    Url: "/contact-us"
                }
            ]
        };
    }
    public static  CreateVerticalMenuModelForDealerOnly(): VerticalMenuModel{
        return {
            Header: "<h4 class='pt-4'>Dealer Only</h4>",
            Links: [
                {
                    Title: "New Customer",
                    Page: "New Customer",
                    Url: "/new-customer"
                },
                {
                    Title: "Shipping Programs",
                    Page: "Shipping Programs",
                    Url: "/shipping-programs"
                },
                {
                    Title: "Claim Policy",
                    Page: "Claim Policy",
                    Url: "/claim-policy"
                }
            ]
        };
    }

}