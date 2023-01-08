import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupGrpcService} from "../../../../core/services/group-grpc.service";
import {AuthService} from "../../../../core/models/account/auth.service";
import {GroupModel} from "../../../../core/models/group/group.model";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    Groups: GroupModel[] = [];
    @Input()
    SelectedGroup: string = "";
    @Output() SelectedGroupChanged = new EventEmitter<string>();

    constructor(private account: AuthService) {
    }

    ngOnInit(): void {
        this.LoadData();
    }

    LoadData() {
        const GroupService = new GroupGrpcService(this.account);
        GroupService.GetAll().then(data => {
            this.Groups = data.sort((a, b) => a.Order > b.Order ? 1 : -1);
        }).catch(data => {
        })
    }
    IsSelected(GroupName: string): boolean{
        return this.SelectedGroup === GroupName;
    }
    OnButtonClick(GroupName: string){
        this.SelectedGroup = GroupName;
        this.SelectedGroupChanged.emit(GroupName);
    }
}
