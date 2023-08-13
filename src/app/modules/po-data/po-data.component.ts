import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { PoGrpcService } from 'src/app/core/services/po-grpc.service';
import {AuthService} from "../../core/models/account/auth.service";
import { PoDataModel } from 'src/app/core/models/po/po-data-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/core/services/shareddata.service';
import { PoDataExcelModel } from 'src/app/core/models/po/po-data-excel-model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PoDataSave } from 'src/app/core/protos/generated/po/po_pb';
import { Int32Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import { formatDate } from '@angular/common';

@Component({
  selector: 'po-data',
  templateUrl: './po-data.component.html',
  styleUrls: ['./po-data.component.css']
})
export class PoDataComponent implements OnInit {
  
  
  public PoData: PoDataModel = new PoDataModel([],[]);
  public SearchableData: PoDataExcelModel[] = [];
  public SortType: string = "0";
  public SortFiledName: string = "";
  public SearchContent: string = "";
  private accSub: Subscription | null = null;

  public PoDataForm: FormGroup = new FormGroup({
    PoDataRow: new FormArray([])
  });  
  
  constructor(private router: Router, private route: ActivatedRoute, private account: AuthService, private sharedData: SharedDataService,
              private chDetect: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage("PoData"))
          this.router.navigateByUrl('/');
    });
    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false);
    });
    this.account.IsValid();
    this.LoadData();
  }

  LoadData(){
    const service = new PoGrpcService(this.account);
    service.Get().then(data => {      
      this.PoData = data;
      this.SearchableData = this.PoData.ExcelData;
      this.CreateControlsOfForm(this.PoData.ExcelData);
    }).catch(error => {
      this.PoData = new PoDataModel([],[]);
    })
  }
  CreateControlsOfForm(Data: PoDataExcelModel[]){    
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    for (let i = 0; i < Data.length; i++) {
      let group = new FormGroup({});
      group.addControl("PONumber", new FormControl(""));
      group.patchValue({PONumber: Data[i].PONumber});

      group.addControl("FactoryStatus", new FormControl(""));
      group.patchValue({FactoryStatus: Data[i].FactoryStatus});

      //group.addControl("StatusDate", new FormControl(""));
      //group.patchValue({StatusDate: this.getDefaultIfThereIsaValue(Data[i].StatusDate_Date)});

      group.addControl("FactoryContainerNumber", new FormControl(""));
      group.patchValue({FactoryContainerNumber: Data[i].FactoryContainerNumber});

      //group.addControl("FactoryBookingDate", new FormControl(""));
      //group.patchValue({FactoryBookingDate: this.getDefaultIfThereIsaValue(Data[i].FactoryBookingDate_Date)});

      group.addControl("DocSendOutDate", new FormControl(""));
      group.patchValue({DocSendOutDate: this.getDefaultIfThereIsaValue(Data[i].DocumentsSendOutDate_Date)});

      group.addControl("ForwarderName", new FormControl(""));
      group.patchValue({ForwarderName: Data[i].ForwarderName});

      group.addControl("BookingDate", new FormControl(""));
      group.patchValue({BookingDate: this.getDefaultIfThereIsaValue(Data[i].BookingDate_Date)});

      group.addControl("Rate", new FormControl(""));
      group.patchValue({Rate: Data[i].Rate});

      group.addControl("ETD", new FormControl(""));
      group.patchValue({ETD: this.getDefaultIfThereIsaValue(Data[i].ETD_Date)});

      group.addControl("ETA", new FormControl(""));
      group.patchValue({ETA: this.getDefaultIfThereIsaValue(Data[i].ETA_Date)});

      group.addControl("PortOfDischarge", new FormControl(""));
      group.patchValue({PortOfDischarge: Data[i].PortOfDischarge});

      group.addControl("DischargeStatus", new FormControl(""));
      group.patchValue({DischargeStatus: Data[i].DischargeStatus});

      group.addControl("ShippmentStatus", new FormControl(""));
      group.patchValue({ShippmentStatus: Data[i].ShippmentStatus});

      group.addControl("GateIn", new FormControl(""));
      group.patchValue({GateIn: this.getDefaultIfThereIsaValue(Data[i].GateIn_Date)});

      group.addControl("EmptyDate", new FormControl(""));
      group.patchValue({EmptyDate: this.getDefaultIfThereIsaValue(Data[i].EmptyDate_Date)});

      group.addControl("Gateout", new FormControl(""));
      group.patchValue({Gateout: this.getDefaultIfThereIsaValue(Data[i].GateOut_Date)});

      group.addControl("BillDate", new FormControl(""));
      group.patchValue({BillDate: this.getDefaultIfThereIsaValue(Data[i].BillDate_Date)});

      poDataRow.push(group);
    }    
  }
  getDefaultIfThereIsaValue(dateValue: Date | undefined){
    if (dateValue)
      return dateValue!.getFullYear() + "-" + ("0" + (dateValue!.getMonth() + 1)).slice(-2) + "-" +  ("0" + (dateValue!.getDate())).slice(-2);
    else
      return null;
  }

  IsColumnAllowedToShow(colName:string) : boolean{
    //return this.PoData.ColumnsHavePermission.includes(colName);
    let hasPermission = false;
    this.PoData.ColumnsHavePermission.forEach(x=> 
    {
        if (x.ColName == colName)
          hasPermission =  true;
    });
    return hasPermission;
  }
  IsColumnWritable(colName:string): boolean{
    let hasPermission = false;
    this.PoData.ColumnsHavePermission.forEach(x=> 
    {
        if (x.ColName == colName)
          hasPermission =  x.IsWritable;
    });    
    return hasPermission;
  }
  GetColColspanForGroupColumn(colsName: string[]) : Number{
    let count = 0;
    for(let i:number = 0; i<colsName.length;i++)
    {
      if (this.IsColumnAllowedToShow(colsName[i]))
        count++;
    }
    return count;
  }
  OnSortData(){
    let SortableSearchableData = [...this.SearchableData];
    SortableSearchableData.sort((a,b) => 
    {
       const aValue = Reflect.get(a, this.SortFiledName);
       const bValue = Reflect.get(b, this.SortFiledName);
       if (this.SortType == "0")
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
       else          
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });    
    this.SearchableData = SortableSearchableData;
  }
  OnSearchData(){    
    if (this.SearchContent && this.SearchContent.trim()!="")
    {
      let value = this.SearchContent.trim().toLowerCase();
      this.SearchableData = this.PoData.ExcelData.filter(x=> x && x.Searchable && x.Searchable.indexOf(value)>=0);
    }
    else
    {
      this.SearchableData = this.PoData.ExcelData;
    }
  }
  OnShippmentStatusChanged(index: number){
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    const row = poDataRow.at(index);
    const rowValue = row.value;    
    const control = row.get("Rate");
    if (poDataRow && control && rowValue && rowValue.ShippmentStatus === "0")
        control.disable();
    else if (control)
        control.enable();
  }
  OnFactoryStatusChanged(index: number){
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    const row = poDataRow.at(index);
    const rowValue = row.value;
    const control = row.get("FactoryStatus");
    if (poDataRow && control && rowValue && rowValue.FactoryStatus === "5")
        control.disable();
    else if (control)
        control.enable();
  }
  OnBillDate(index: number){
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    const row = poDataRow.at(index);
    const rowValue = row.value;
    const control = row.get("BillDate");
    if (poDataRow && control && !control.disabled && rowValue && rowValue.BillDate != "")
    {      
      //row.disable();
      //control?.enable();
    }
    else
    {
      //row.enable();
    }
  }

  OnSubmit(){
    const poDataRows = this.PoDataForm.get("PoDataRow") as FormArray;
    const service = new PoGrpcService(this.account);
    const values : PoDataSave[] = []; 
    for (let i:number = 0; i<poDataRows.length;i++)
    {
        const element = poDataRows.at(i).value;        
        if (element.FactoryStatus>= 0 || element.DocSendOutDate || element.FactoryContainerNumber ||element.ForwarderName>=0 || element.BookingDate ||
          element.Rate || element.ETD || element.ETA || element.PortOfDischarge || element.DischargeStatus>=0 || element.ShippmentStatus>=0 || 
          element.GateIn || element.EmptyDate || element.Gateout || element.BillDate)
        {
          console.log(element);
          const value: PoDataSave = new PoDataSave();
          value.setPonumber(element.PONumber);
          if (element.FactoryStatus>=0)
          {
            const f = new Int32Value();
            f.setValue(+element.FactoryStatus);
            value.setFactorystatus(f);
          }
          //value.setStatusdate(element.StatusDate);
          value.setFactorycontainernumber(element.FactoryContainerNumber);          
          //value.setFactorybookingdate(element.FactoryBookingDate);
          value.setDocumentssendoutdate(element.DocSendOutDate);
          if (element.ForwarderName>=0)
          {
            const fo = new Int32Value();
            fo.setValue(+element.ForwarderName);
            value.setForwardername(fo);
          }
          value.setBookingdate(element.Bookingdate);
          value.setRate(element.Rate);
          value.setEtd(element.ETD);
          value.setEta(element.ETA);
          value.setPortofdischarge(element.PortOfDischarge);

          if (element.DischargeStatus>=0)
          {
            const d = new Int32Value();
            d.setValue(+element.DischargeStatus);
            value.setDischargestatus(d);
          }          

          if (element.ShippmentStatus>=0)
          {
            const s = new Int32Value();
            s.setValue(+element.ShippmentStatus);
            value.setShippmentstatus(s);
          }                    
          value.setGatein(element.GateIn);
          value.setEmptydate(element.EmptyDate);
          value.setGateout(element.Gateout);
          value.setBilldate(element.BillDate);
          values.push(value);
        }
    }
    service.Save(values).then(data => 
      { 
        this.SearchContent = "";
        this.OnSearchData();
        if (Array.isArray(data[2]) && data[2].length>0)
        {
          console.log("Data from Server");
          console.log(data[2]);
          data[2].forEach(x=>{
            //var foundedData = this.PoData.ExcelData.find(y=>y.PONumber == x.PoNumber);
            var foundedData = this.SearchableData.find(y=>y.PONumber.toLocaleLowerCase() == x.PoNumber.toLocaleLowerCase());
            if (foundedData)
            {
              console.log("foundedData");
              foundedData.ConfirmDate = x.ConfirmDate;
              foundedData.BookingDate = x.BookingDate;
              foundedData.StatusDate = x.StatusDate;
            }
          });
          this.chDetect.detectChanges();
        }
        alert(data[0]);
      }).catch(data => { alert(data[0]);});
  }
  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
