import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {VerticalMenuModel} from "./models/vertical-menu.model";

@Component({
    selector: 'vertical-menu',
    templateUrl: './vertical-menu.component.html',
    styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent implements OnInit {
    @ViewChild("VerticalMenuHeaderElement") VerticalMenuHeaderElement: ElementRef | null = null;
    public menu: VerticalMenuModel = new VerticalMenuModel();
    @Input()
    public set Menu(value: VerticalMenuModel) {
        this.menu = value;
        if (this.VerticalMenuHeaderElement != null) {
            this.VerticalMenuHeaderElement.nativeElement.innerHTML = this.menu.Header;
        }
    }
    public get Menu(){
        return this.menu;
    }

    constructor() {
    }

    ngOnInit(): void {
    }
    ngAfterViewInit(): void{
        if (this.VerticalMenuHeaderElement != null) {
            this.VerticalMenuHeaderElement.nativeElement.innerHTML = this.menu.Header;
        }
    }
}
