import { Directive, ElementRef, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: '[ClickedOutside]'
})

export class ClickedOutSideDirective{

    constructor(private elem: ElementRef) {}
    @Output() public OnClickedOutside = new EventEmitter();

    @HostListener('document:click',['$event.target'])
    public onClick(target: any){        
        const clickedOutside = this.elem.nativeElement.contains(target);
        if (!clickedOutside)
        {
            this.OnClickedOutside.emit(target);
        }
    }
}