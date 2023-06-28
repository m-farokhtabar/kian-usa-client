import { Component, OnInit } from '@angular/core';
import { PoGrpcService } from 'src/app/core/services/po-grpc.service';
import {AuthService} from "../../core/models/account/auth.service";
import { PoDataModel } from 'src/app/core/models/po/po-data-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/core/services/shareddata.service';
import { PoDataExcelModel } from 'src/app/core/models/po/po-data-excel-model';

@Component({
  selector: 'po-data',
  templateUrl: './po-data.component.html',
  styleUrls: ['./po-data.component.css']
})
export class PoDataComponent implements OnInit {
  
  
  public PoData: PoDataModel = new PoDataModel([],[]);
  public SearchableData: PoDataExcelModel[] = [];
  private accSub: Subscription | null = null;
  
  constructor(private router: Router, private route: ActivatedRoute, private account: AuthService, private sharedData: SharedDataService,) { }

  ngOnInit(): void {
    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage("PoData"))
          this.router.navigateByUrl('/');
    });
    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false)
    });
    this.account.IsValid();
    this.LoadData();
  }

  LoadData(){    
    const service = new PoGrpcService(this.account);
    service.Get().then(data => {      
      this.PoData = data;
      this.SearchableData = this.PoData.ExcelData;
    }).catch(error => {
      this.PoData = new PoDataModel([],[]);
    })
  }
  IsColumnAllowedToShow(colName:string) : boolean{
    return this.PoData.ColumnsHavePermission.includes(colName);
  }
  OnSearchData(event: Event){
    let value = (<HTMLInputElement>event.target).value;
    if (value && value.trim()!="")
    {
      value = value.trim();
      console.log(this.PoData.ExcelData[0]);
      console.log("aasdad");
      this.SearchableData = this.PoData.ExcelData.filter(x=> x && x.Searchable && x.Searchable.indexOf("|"+value.toLowerCase())>0);
    }
    else
    {
      this.SearchableData = this.PoData.ExcelData;
    }
  }
  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
