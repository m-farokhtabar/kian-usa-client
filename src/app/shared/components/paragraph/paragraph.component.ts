import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ParagraphViewmodel} from "./viewmodel/paragraph.viewmodel";

@Component({
    selector: 'paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit,AfterViewInit {
    @ViewChild("ParagraphElement") ParagraphElement: ElementRef | null = null;


    private data: ParagraphViewmodel = new ParagraphViewmodel("");
    @Input()
    public set Data(value: ParagraphViewmodel){
        this.data = value;
        if (this.ParagraphElement != null)
            this.ParagraphElement.nativeElement.innerHTML =  this.data.Content;
    }
    public get Data(){
        return this.data;
    }
    constructor() {
    }

    ngOnInit(): void {
    }
    ngAfterViewInit(): void{
        if (this.ParagraphElement != null)
            this.ParagraphElement.nativeElement.innerHTML =  this.data.Content;
    }
}
