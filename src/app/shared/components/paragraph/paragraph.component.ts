import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ParagraphViewmodel} from "./viewmodel/paragraph.viewmodel";

@Component({
    selector: 'paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {
    @ViewChild("ParagraphElement") ParagraphElement: ElementRef | null = null;

    @Input()
    public set Data(value: ParagraphViewmodel){
        if (this.ParagraphElement != null)
            this.ParagraphElement.nativeElement.innerHTML = value.Content;
    }
    constructor() {
    }

    ngOnInit(): void {
    }
}
