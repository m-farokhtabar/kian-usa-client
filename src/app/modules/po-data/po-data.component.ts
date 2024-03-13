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
import { DoubleValue, Int32Value } from 'google-protobuf/google/protobuf/wrappers_pb';
import { Tools } from 'src/app/shared/helper/tools';
import { CurrencyPipe } from '@angular/common';

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
              private chDetect: ChangeDetectorRef, private currencyPipe : CurrencyPipe) { }

  ngOnInit(): void {
    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage(this.GetPage()[0]))
          this.router.navigateByUrl('/');
    });
    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false);
    });
    this.account.IsValid();
    this.LoadData();
  }
  GetPage() : [pageName: string,isArchive: boolean | null]{
    if (this.route.snapshot.url[this.route.snapshot.url.length - 1].path.toLocaleLowerCase() == 'po-data')
      return ["PoData",false];
    else if (this.route.snapshot.url[this.route.snapshot.url.length - 1].path.toLocaleLowerCase() == 'archive')
      return ["PoDataArchive",true];
    else
      return ["",null];
  }
  LoadData(){
    const service = new PoGrpcService(this.account);
    const isArchive: boolean | null = this.GetPage()[1];
    if (isArchive != null)
    {
      service.Get(isArchive).then(data => {
        this.PoData = data;
        this.SearchableData = this.PoData.ExcelData;
        this.CreateControlsOfForm(this.PoData.ExcelData);
      }).catch(error => {
        this.PoData = new PoDataModel([],[]);
      })
    }
  }
  CreateControlsOfForm(Data: PoDataExcelModel[]){
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    for (let i = 0; i < Data.length; i++) {
      Data[i].RowNumberInTable = i;
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
      group.patchValue({Rate: this.currencyPipe.transform(Data[i].Rate, '$') });      

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

      group.addControl("Note", new FormControl(""));
      group.patchValue({Note: Data[i].Note});

      poDataRow.push(group);      
    }
    if (poDataRow && poDataRow.length>0)
    {
      for(let i: number=0;i<poDataRow.length;i++)
      {
        this.IfFactoryStatusIsBookedAndForwardHasToBeDisabled(i);
        this.OnShippmentStatusChanged(i);
      } 
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
  NoneOfTheColumnIsWritable(): boolean{
    let hasPermission = false;
    this.PoData.ColumnsHavePermission.forEach(x=> 
    {        
          hasPermission =  hasPermission || x.IsWritable;
    });    
    return !hasPermission;
  }
  GetColColspanForGroupColumn(colsName: string[]) : number{
    let count = 0;
    for(let i:number = 0; i<colsName.length;i++)
    {
      if (this.IsColumnAllowedToShow(colsName[i]))
        count++;
    }
    return count;
  }
  OnSortData(){
    this.UpdateDataFromInput();
    let SortableSearchableData = [...this.SearchableData];
    SortableSearchableData.sort((a,b) => 
    {
      
       let aValue = Reflect.get(a, this.SortFiledName);
       let bValue = Reflect.get(b, this.SortFiledName);
       if (this.SortFiledName == 'FactoryStatus' || this.SortFiledName == 'ForwarderName' || this.SortFiledName == 'DischargeStatus' || this.SortFiledName == 'ShippmentStatus')
       {
        //به دلیل اون آیتم خالی مسخره و کد 999999 مجبور شدم نالش کنم که توی مرتب سازی سوتی نده
        if (aValue == 999999)
             aValue = null;
         if (bValue == 999999)
             bValue = null;
       }       
        
       //Low to high
       if (this.SortType == "0")
       {
        if (aValue == undefined && bValue == undefined)
          return 0;
        if (Number.isNaN(aValue) && Number.isNaN(bValue))
          return 0;
        if (aValue == undefined || Number.isNaN(aValue))
        {
          return -1;
        }
        if (bValue == undefined || Number.isNaN(bValue))
        {
          return 1;
        }        
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
       }
       else          
       {
        if (aValue == undefined && bValue == undefined)
          return 0;
        if (Number.isNaN(aValue) && Number.isNaN(bValue))
          return 0;
        if (aValue == undefined || Number.isNaN(aValue))
          return 1;
        if (bValue == undefined || Number.isNaN(bValue))
          return -1;
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
       }
    });
    this.SearchableData = SortableSearchableData;
  }
  OnSearchData(){        
    if (this.SearchContent && this.SearchContent.trim()!="")
    {
      let multiSearchValue = this.SearchContent.trim().toLowerCase().split(",");
      this.SearchableData = [];
      multiSearchValue.forEach(value => {
        if (value)
        {
          const foundData = this.PoData.ExcelData.filter(x=> x && x.Searchable && x.Searchable.indexOf(value)>=0);          
          if (Array.isArray(foundData))
            Array.prototype.push.apply(this.SearchableData, foundData);
        }
      });
    }
    else
    {
      this.SearchableData = this.PoData.ExcelData;      
    }    
  }
  OnFocusSearchButton(){
    this.UpdateDataFromInput();
  }             
  UpdateDataFromInput()
  {
    const poDataRows = this.PoDataForm.get("PoDataRow") as FormArray;
    for (let i:number = 0; i<poDataRows.length;i++)
    {
     const element = poDataRows.at(i).value;
     var FoundedData = this.SearchableData.find(x=>x.PONumber === element.PONumber);
     if (FoundedData)
     {      
       
       FoundedData.FactoryStatus = +element.FactoryStatus;       
       if (!element.FactoryStatus)
       {
         const fS = poDataRows.getRawValue()[i].FactoryStatus;
         if (fS)
          FoundedData.FactoryStatus = fS;
       }
       //FoundedData.StatusDate /* Do not need it is updated */
       FoundedData.FactoryContainerNumber = element.FactoryContainerNumber;

       //FoundedData.FactoryBookingDate  /* Do not need it is updated */
       FoundedData.DocumentsSendOutDate = element.DocSendOutDate;
       FoundedData.ForwarderName = +element.ForwarderName;
       FoundedData.BookingDate = element.BookingDate;
       if (element.Rate)
        FoundedData.Rate = +(element.Rate.replace("$","").replace(",",""));
       FoundedData.ETD = element.ETD;
       FoundedData.ETA = element.ETA;
       FoundedData.PortOfDischarge = element.PortOfDischarge;
       FoundedData.DischargeStatus = +element.DischargeStatus;
       FoundedData.ShippmentStatus = +element.ShippmentStatus;
       
       //FoundedData.ConfirmDate  /* Do not need it is updated */
       FoundedData.GateIn = element.GateIn;
       FoundedData.EmptyDate = element.EmptyDate;
       FoundedData.GateOut = element.Gateout;
       FoundedData.BillDate = element.BillDate;
       FoundedData.Note = element.Note;
       FoundedData.MakeSearchableValue();
     }
    }
  }
  OnShippmentStatusChanged(index: number){    
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    const rawData = this.PoDataForm.getRawValue();
    const row = poDataRow.at(index);
    const rowValue = row.value;    
    const control = row.get("Rate");
    
    if (poDataRow && control && rowValue && (rowValue.ShippmentStatus === "0" || rowValue.ShippmentStatus === 0) ||
       (control && rawData.PoDataRow[index] && (rawData.PoDataRow[index].ShippmentStatus == "0" || rawData.PoDataRow[index].ShippmentStatus == 0)))
    {      
        control.disable();
    }
    else if (control)
        control.enable();
  }
  IfFactoryStatusIsBookedAndForwardHasToBeDisabled(index: number){
    const poDataRow = this.PoDataForm.get("PoDataRow") as FormArray;
    const rawData = this.PoDataForm.getRawValue();
    const row = poDataRow.at(index);
    const rowValue = row.value;
    const control = row.get("FactoryStatus");
    //Booked with forwarder    
    if (
        (poDataRow && control && rowValue && (rowValue.FactoryStatus === "5" || rowValue.FactoryStatus === 5)) ||
        (control && rawData.PoDataRow[index] && (rawData.PoDataRow[index].FactoryStatus == "5" || rawData.PoDataRow[index].FactoryStatus == 5))
       ) 
    {
        control.disable();
    }
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
          element.GateIn || element.EmptyDate || element.Gateout || element.BillDate || element.Note)
        {
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
          value.setBookingdate(element.BookingDate);                
          //به دلیل اینکه در این حالت ممکن است غیر فعال باشد ولی چون در همان لحظه ای که مقدار تغییر داده بعد غیر فعال شده پس می تواند تغییر کند
          
          if (element.Rate)
          {
            const rt =  new DoubleValue();
            rt.setValue(+element.Rate.replace("$","").replace(",",""));
            value.setRate(rt);
          }
          else if (poDataRows.getRawValue()[i].Rate)
          {
            const rt =  new DoubleValue();
            rt.setValue(+poDataRows.getRawValue()[i].Rate.replace("$","").replace(",",""));
            value.setRate(rt);
          }
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
          value.setNote(element.Note);
          values.push(value);
        }
    }
    service.Save(values).then(data => 
      { 
        this.SearchContent = "";
        this.OnSearchData();
        if (Array.isArray(data[2]) && data[2].length>0)
        {
          data[2].forEach(x=>{
            //var foundedData = this.PoData.ExcelData.find(y=>y.PONumber == x.PoNumber);
            var foundedData = this.SearchableData.find(y=>y.PONumber.toLocaleLowerCase() == x.PoNumber.toLocaleLowerCase());
            if (foundedData)
            {
              foundedData.ConfirmDate = x.ConfirmDate;
              foundedData.BookingDate = x.BookingDate;
              foundedData.StatusDate = x.StatusDate;
              if (foundedData.Rate != x.Rate)
                foundedData.Rate = x.Rate;

              foundedData.FactoryStatusNeedsToHaveReadyToGO = x.FactoryStatusNeedsToHaveReadyToGO;
            }
          });
          const poDataRows = this.PoDataForm.get("PoDataRow") as FormArray;
          for(let i: number=0;i<poDataRows.length;i++)
          {
            this.IfFactoryStatusIsBookedAndForwardHasToBeDisabled(i);
          }
          this.chDetect.detectChanges();
        }
        alert(data[0]);
      }).catch(data => { alert(data[0]);});
  }
  OnBlurRateBox(event:any, InputsRowNumber : number)
  {            
    const value = this.MakeStringNumberMoneyFormat(event.target.value);
    //event.target.value = value;
    
    const poDataRows = this.PoDataForm.get("PoDataRow") as FormArray;
    const row = poDataRows.at(InputsRowNumber);
    const controlRate = row.get("Rate");
    if(controlRate)
      controlRate.setValue(value);
  }
  MakeStringNumberMoneyFormat(data : string) : string | null
  {      
    if (data)
    {      
      const number = +data.replace("$","").replace(",","");
      return this.currencyPipe.transform(number, '$');      
    }
    else
      return null;
  }
  MakeNumberMoneyFormat(data : number | undefined) : string | null
  {
    if (Number != undefined && !Number.isNaN(data))
      return this.currencyPipe.transform(data, '$');
    else
      return null;
  }
  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
