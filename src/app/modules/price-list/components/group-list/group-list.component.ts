import {Component, OnInit} from '@angular/core';
import {CategoryGrpcService} from "../../../../core/services/category-grpc.service";
import {CategoryDetailsShortModel} from "../../../../core/models/category/category-details-short.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../core/models/account/auth.service";

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
    CategoriesShort: CategoryDetailsShortModel[] = [];

    constructor(private route: ActivatedRoute, private account: AuthService) {
    }

    ngOnInit(): void {
        const Service = new CategoryGrpcService(this.account);
        Service.GetAllShortData().then(data => {
            if (Array.isArray(data) && data.length > 0) {
                this.CategoriesShort = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
            }
        });
    }
    //[ngClass] = "{'ProductButtonActive': RouteIsMatchWithFirstGroup(Idx === 0)}"
    // RouteIsMatchWithFirstGroup(IsFirstCategory: boolean): boolean{
    //         return IsFirstCategory && this.route.snapshot.params['slug'] == null;
    // }
}