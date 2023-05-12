import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CellStyle, GridCell} from "../grid/viewmodel/grid.viewmodel";
import {Tools} from "../../helper/tools";
import {Router} from "@angular/router";
import {GridHelper} from "../grid/helper/grid.helper";
import {AuthService} from "../../../core/models/account/auth.service";

@Component({
  selector: 'horizontal-slider',
  templateUrl: './horizontal-slider.component.html',
  styleUrls: ['./horizontal-slider.component.css']
})
export class HorizontalSliderComponent implements OnInit {

  public GetCurrentPrice = GridHelper.GetCurrentPrice;
  public GetFirstPrice = GridHelper.GetFirstPrice;
  public HasMoreThanOnePrice = GridHelper.HasMoreThanOnePrice;

  @Input()
  public Cells : GridCell[] = [];
  @Input()
  public CellStyle: CellStyle = CellStyle.ShopCard;
  @Input()
  public IsUseShortDescriptionAsAnAlert = false;
  @Input()
  public UseDescription = false;
  @Input()
  public ZoomOnImageWhenMouseOver = false;

  constructor(private router: Router, public account: AuthService ) { }

  ngOnInit(): void {
  }

  IsThemeUp(): boolean {
    return this.CellStyle === CellStyle.Up
  }

  IsThemeCard(): boolean {
    return this.CellStyle === CellStyle.Card || this.CellStyle === CellStyle.CardWithDescription || this.CellStyle === CellStyle.ShopCard;
  }

  IsThemeCardWithDescription(): boolean {
    return this.CellStyle === CellStyle.CardWithDescription
  }

  IsThemeShopCard() {
    return this.CellStyle === CellStyle.ShopCard
  }

  private mouseDown = false;
  private startX: any;
  private scrollLeft: any;
  private DisabledClick:boolean = false;
  private MouseMoving:boolean = false;
  OnMouseDown(event:any, horSliderContainer:any) {
    this.mouseDown = true;
    this.startX = event.pageX - horSliderContainer.offsetLeft;
    this.scrollLeft = horSliderContainer.scrollLeft;
    horSliderContainer.style.cursor = "grabbing";
  }
  OnMouseUp(horSliderContainer:any) {
    this.mouseDown = false;
    if (this.MouseMoving) {
      this.MouseMoving = false;
      this.DisabledClick = true;
    }
    else
      this.DisabledClick = false;
    horSliderContainer.style.cursor = "pointer";
  }
  OnMouseLeave(horSliderContainer:any) {
    this.mouseDown = false;
    this.DisabledClick = false;
    this.MouseMoving = false;
    horSliderContainer.style.cursor = "pointer";
  }
  OnMouseMoveEvent(event:any, horSliderContainer:any) {
    this.MouseMoving = false;
    event.preventDefault();
    if (!this.mouseDown) {
      return;
    }

    const x = event.pageX - horSliderContainer.offsetLeft;
    const scroll = x - this.startX;
    horSliderContainer.scrollLeft = this.scrollLeft - scroll;
    //برای این است که بدون جابجایی واقعی عملیات کلیک را غیر فعال نکند
    if (scroll != 0)
      this.MouseMoving = true;
  }
  OnMouseClick(event:any, Link:string){
    if (this.DisabledClick == false)
      this.router.navigateByUrl(Link);
    this.DisabledClick = false;
  }
}
