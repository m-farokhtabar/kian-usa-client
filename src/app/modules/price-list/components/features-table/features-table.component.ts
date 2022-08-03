import {Component, Input, OnInit} from '@angular/core';
import {CategoryParameterModel} from "../../../../core/models/category/category-parameter.model";

@Component({
  selector: 'features-table',
  templateUrl: './features-table.component.html',
  styleUrls: ['./features-table.component.css']
})
export class FeaturesTableComponent implements OnInit {
  @Input() CategoryFeatures: CategoryParameterModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
