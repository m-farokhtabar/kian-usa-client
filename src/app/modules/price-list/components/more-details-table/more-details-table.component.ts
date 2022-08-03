import {Component, Input, OnInit} from '@angular/core';
import {CategoryParameterModel} from "../../../../core/models/category/category-parameter.model";

@Component({
  selector: 'more-details-table',
  templateUrl: './more-details-table.component.html',
  styleUrls: ['./more-details-table.component.css']
})
export class MoreDetailsTableComponent implements OnInit {
  @Input() CategoryParameters: CategoryParameterModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
