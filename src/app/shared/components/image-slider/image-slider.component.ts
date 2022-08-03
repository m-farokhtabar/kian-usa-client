import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ImageSliderModel} from "./models/image-slider.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  @ViewChild('NextSlideCarousel') NextSlideCarousel: ElementRef | null = null;

  @Input() set Sliders(value:ImageSliderModel[]) {
    if (!Array.isArray(value) || value.length == 0)
      this.sliders = [new ImageSliderModel(this.DefaultImage,this.DefaultAlt)];
    else
      this.sliders = value;
  }
  get Sliders() : ImageSliderModel[]{
    return this.sliders;
  }

  @Input() SliderName: string = "imageSliderDefault";
  @Input() DefaultImage: string = "";
  @Input() DefaultAlt: string = "";
  @Input() IsFullScreen: boolean = false;
  @Input() ShowDialogForFullScreen: boolean = false;
  @Input() SliderAnimationInterval = 0;

  private sliders: ImageSliderModel[] = [];


  constructor(private route: ActivatedRoute,private ch: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.SliderAnimationInterval>0) {
      setInterval(() => {
        const event = new CustomEvent("click");
        this.NextSlideCarousel?.nativeElement.dispatchEvent(event);
      }, this.SliderAnimationInterval);
    }
  }

}
