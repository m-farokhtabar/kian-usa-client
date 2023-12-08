import {Component, OnInit} from '@angular/core';
import {Constant} from "../../shared/helper/constant";
import {ImageSliderModel} from "../../shared/components/image-slider/models/image-slider.model";
import {ActivatedRoute} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {GridViewmodel, CellStyle} from "../../shared/components/grid/viewmodel/grid.viewmodel";
import {ParagraphViewmodel} from "../../shared/components/paragraph/viewmodel/paragraph.viewmodel";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    DefaultImageSlider: string = Constant.DefaultImageFileName;
    SliderImages: ImageSliderModel[] = [];    

    constructor(private route: ActivatedRoute, private sharedData: SharedDataService) {
        this.SliderImages =
            [
                new ImageSliderModel(Constant.HomeSlider + "kian_usa_home_slider_1.jpg", "KIAN USA Furniture"),
                new ImageSliderModel(Constant.HomeSlider + "kian_usa_home_slider_2.jpg", "KIAN USA Furniture"),
                new ImageSliderModel(Constant.HomeSlider + "kian_usa_home_slider_3.jpg", "KIAN USA Furniture"),
                new ImageSliderModel(Constant.HomeSlider + "kian_usa_home_slider_4.jpg", "KIAN USA Furniture"),
                new ImageSliderModel(Constant.HomeSlider + "kian_usa_home_slider_5.jpg", "KIAN USA Furniture")
            ]
    }

    ngOnInit(): void {
        this.route.params.subscribe(() => this.sharedData.SetMenuStatus(false));
    }

    public FirstGrid(): GridViewmodel {
        return {
            Cells:
                [
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_01_0001_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_01_0002_1.jpg",

                        Link: "/contact-us",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: false
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_01_0003_1.jpg",

                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: false
                    }
                ],
            CellsPerRow: 3,
            MaxRowPerPage: 1,
            CellStyle: CellStyle.Up,
            GridStyle: ["1,2","1,2"]
        };
    }
    public FirstParagraph(): ParagraphViewmodel{
        return {
            Content: "<h1 style='text-align: center;'>In the spotlight</h1>"
        }
    }
    public SecondGrid(): GridViewmodel {
        return {
            Cells:
                [
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0001_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0002_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0003_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0004_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0005_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0006_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0007_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0008_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "",
                        Alt: "KianUSA",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0009_1.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    }
                ],
            CellsPerRow: 3,
            MaxRowPerPage: 3,
            CellStyle: CellStyle.Down,
            GridStyle: ["1,3","1,3"]
        };
    }
    public ThirdGrid(): GridViewmodel {
        return {
            Cells:
                [
                    {
                        Title: "Find the Nearest Retail Store",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0001.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "Visit us at Market",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0002.jpg",
                        Link: "/visit-us-at-market",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "Special Request",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0003.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    },
                    {
                        Title: "Coming Soon",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0004.jpg",
                        Link: "/",
                        ShortDescription: "",
                        Prices : [],
                        Quantity: "",
                        Description: "",
                        PriceNames: [],
                        PricePermissions: [],
                        ShowInImageDialogBox: true
                    }
                ],
            CellsPerRow: 4,
            MaxRowPerPage: 1,
            CellStyle: CellStyle.Card,
            GridStyle: ["1,4","1,4"]
        };
    }

}
