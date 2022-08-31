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
                        Title: "Sectional",
                        Alt: "KianUSA sectional furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_01_0001.jpg",
                        Link: "/",
                        ShortDescription: ""
                    },
                    {
                        Title: "Sofa & Loveseat & chair",
                        Alt: "KianUSA Sofa & Loveseat & chair",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_01_0002.jpg",

                        Link: "/",
                        ShortDescription: ""
                    }
                ],
            CellsPerRow: 2,
            MaxRowPerPage: 1,
            CellStyle: CellStyle.Up,
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
                        Title: "Power Back & Seat",
                        Alt: "KianUSA Power Back & Seat",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0001.jpg",
                        Link: "/",
                        ShortDescription: ""
                    },
                    {
                        Title: "Power Seat",
                        Alt: "KianUSA Power Seat",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0002.jpg",
                        Link: "/",
                        ShortDescription: ""
                    },
                    {
                        Title: "Manual",
                        Alt: "KianUSA Manual",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_02_0003.jpg",
                        Link: "/",
                        ShortDescription: ""
                    }
                ],
            CellsPerRow: 3,
            MaxRowPerPage: 1,
            CellStyle: CellStyle.Up,
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
                        ShortDescription: ""
                    },
                    {
                        Title: "Visit us at Market",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0002.jpg",
                        Link: "/visit-us-at-market",
                        ShortDescription: ""
                    },
                    {
                        Title: "Special Request",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0003.jpg",
                        Link: "/",
                        ShortDescription: ""
                    },
                    {
                        Title: "Coming Soon",
                        Alt: "KianUSA furniture",
                        ImageUrl: Constant.ImageHost + Constant.HomeGrid + "grid_03_0004.jpg",
                        Link: "/",
                        ShortDescription: ""
                    }
                ],
            CellsPerRow: 4,
            MaxRowPerPage: 1,
            CellStyle: CellStyle.Card,
        };
    }
}
