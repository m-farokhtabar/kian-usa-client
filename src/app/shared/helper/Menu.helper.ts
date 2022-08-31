import {VerticalMenuModel} from "../components/vertical-menu/models/vertical-menu.model";

export class MenuHelper{
    public static  CreateVerticalMenuModelForWhoWeAre(): VerticalMenuModel{
        return {
            Header: "<h4 class='pt-4'>WHO WE ARE</h4>",
            Links: [
                {
                    Title: "About US",
                    Url: "/about-us"
                },
                {
                    Title: "Visit Us at Market",
                    Url: "/visit-us-at-market"
                },
                {
                    Title: "Privacy Policy",
                    Url: "/privacy-policy"
                },
                {
                    Title: "Contact US",
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
                    Url: "/"
                },
                {
                    Title: "Shipping Programs",
                    Url: "/shipping-programs"
                },
                {
                    Title: "Claim Policy",
                    Url: "/"
                }
            ]
        };
    }

}