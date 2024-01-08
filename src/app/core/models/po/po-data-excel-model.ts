export class PoDataExcelModel {
    constructor(
        User: string,
        date: string,
        CustomerPO: string,
        EstimateNumber: string,
        Name: string,
        PONumber: string,
        DueDate: string,
        ItemGroup: string,
        Forwarder: string,
        IOR: string,
        ShipTo: string,
        ShippingCarrier: string,
        ContainerNumber: string,
        ETAAtPort: string,
        FactoryStatus: number | undefined,
        StatusDate: string,
        FactoryContainerNumber: string,
        FactoryBookingDate: string,
        DocumentsSendOutDate: string,
        ForwarderName: number | undefined,
        BookingDate: string,
        Rate: number | undefined,
        ETD: string,
        ETA: string,
        PortOfDischarge: string,
        DischargeStatus: number | undefined,
        ShippmentStatus: number | undefined,
        ConfirmDate: string,
        GateIn: string,
        EmptyDate: string,
        GateOut: string,
        BillDate: string,
        FactoryStatusNeedsToHaveReadyToGO: boolean, Note: string)
        {
        this.User = User
                
        this.Date = date
        if (date)
            this.Date_Date = new Date(date);
        
            this.CustomerPO = CustomerPO
        this.EstimateNumber = EstimateNumber
        this.Name = Name
        this.PONumber = PONumber
        
        this.DueDate = DueDate
        if (DueDate)
            this.DueDate_Date = new Date(DueDate);

        this.ItemGroup = ItemGroup
        this.Forwarder = Forwarder
        this.IOR = IOR
        this.ShipTo = ShipTo
        this.ShippingCarrier = ShippingCarrier
        this.ContainerNumber = ContainerNumber
        this.ETAAtPort = ETAAtPort
        this.FactoryStatus = FactoryStatus

        this.StatusDate = StatusDate
        // if (StatusDate)
        //     this.StatusDate_Date = new Date(StatusDate);
        
        this.FactoryContainerNumber = FactoryContainerNumber;
        
        this.FactoryBookingDate = FactoryBookingDate
        if (FactoryBookingDate)
            this.FactoryBookingDate_Date = new Date(FactoryBookingDate);

        this.DocumentsSendOutDate = DocumentsSendOutDate;
        // if (DocumentsSendOutDate)
        //     this.DocumentsSendOutDate_Date = new Date(DocumentsSendOutDate);

        this.ForwarderName = ForwarderName
        this.BookingDate = BookingDate
        //if (BookingDate)
          //  this.BookingDate_Date = new Date(BookingDate);

        this.Rate = Rate
        
        this.ETD = ETD
        // if (ETD)
        //     this.ETD_Date = new Date(ETD);
        
        this.ETA = ETA
        // if (ETA)
        //     this.ETA_Date = new Date(ETA);

        this.PortOfDischarge = PortOfDischarge
        this.DischargeStatus = DischargeStatus
        this.ShippmentStatus = ShippmentStatus

        this.ConfirmDate = ConfirmDate
        // if (ConfirmDate)
        //     this.ConfirmDate_Date = new Date(ConfirmDate);

        this.GateIn = GateIn
        // if (GateIn)
        //     this.GateIn_Date = new Date(GateIn);

        this.EmptyDate = EmptyDate
        // if (EmptyDate)
        //     this.EmptyDate_Date = new Date(EmptyDate);

        this.GateOut = GateOut
        // if (GateOut)
        //     this.GateOut_Date = new Date(GateOut);

        this.BillDate = BillDate
        // if (BillDate)
        //     this.BillDate_Date = new Date(BillDate);

        //this.Searchable = "|" + Name + "|" + PONumber + "|" + + CustomerPO + "|" + ItemGroup + "|" + ContainerNumber;
        //this.Searchable = this.Searchable.toLowerCase(); 
        this.Searchable = "";
        this.MakeSearchableValue();
        this.FactoryStatusNeedsToHaveReadyToGO = FactoryStatusNeedsToHaveReadyToGO;  
        this.Note = Note;
    }
    public MakeSearchableValue(){
        this.Searchable = "|" + this.User + "|" + this.Date + "|" + this.CustomerPO + "|" + this.EstimateNumber + "|" + this.Name +
        "|" + this.PONumber + "|" + this.DueDate + "|" + this.ItemGroup + "|" + this.Forwarder + "|" + this.IOR +
        "|" + this.ShipTo + "|" + this.ShippingCarrier + "|" + this.ContainerNumber + "|" + this.ETAAtPort + "|" + this.getFactoryStatusName() +
        "|" + this.statusDate + "|" + this.FactoryContainerNumber + "|" + this.FactoryBookingDate + "|" + this.documentsSendOutDate + "|" + this.getForwarderName() +
        "|" + this.bookingDate + "|" + this.Rate + "|" + this.eTD + "|" + this.eTA + "|" + this.PortOfDischarge +
        "|" + this.getDischargeStatusName() + "|" + this.getShippmentStatusName() + "|" + this.confirmDate + "|" + this.gateIn + "|" + this.emptyDate +
        "|" + this.gateOut + "|" + this.billDate;
        this.Searchable = this.Searchable.toLowerCase();
    }
    public User: string;
    
    public Date: string;
    public Date_Date: Date | undefined;

    public CustomerPO: string;
    public EstimateNumber: string;
    public Name: string;
    public PONumber: string;
    
    public DueDate: string;
    public DueDate_Date: Date | undefined;
    
    public ItemGroup: string;
    public Forwarder: string;
    public IOR: string;
    public ShipTo: string;
    public ShippingCarrier: string;
    public ContainerNumber: string;
    public ETAAtPort: string;

    public FactoryStatus: number | undefined;
    public getFactoryStatusName() : string {
        if (this.FactoryStatus != undefined && this.FactoryStatus>=0)        
        {
            switch(this.FactoryStatus){
                case 0:{
                    return "Not started";
                }
                case 1:{
                    return "Waiting for fabric";
                }
                case 2:{
                    return "In production";
                }
                case 3:{
                    return "Ready To Go";
                }
                case 4:{
                    return "Waiting for confirmation";
                }
                case 5:{
                    return "Booked with forwarder";
                }
                case 6:{
                    return "Canceled";
                }
            }
        }
        return "";
    }
    
    public StatusDate_Date: Date | undefined;
    private statusDate: string = "";
    public get StatusDate(){
        return this.statusDate;
    }
    public set StatusDate(value: string){
        this.statusDate = value;
        if (value)
            this.StatusDate_Date = new Date(value);
    }
    

    public FactoryContainerNumber: string;

    public FactoryBookingDate: string;
    public FactoryBookingDate_Date: Date | undefined;
    
    public DocumentsSendOutDate_Date: Date | undefined;
    public documentsSendOutDate: string = "";
    public get DocumentsSendOutDate(){
        return this.documentsSendOutDate;
    }
    public set DocumentsSendOutDate(value: string){
        this.documentsSendOutDate = value;
        if (value)
            this.DocumentsSendOutDate_Date = new Date(value);
    }

    public ForwarderName: number | undefined;
    public getForwarderName() : string {
        if (this.ForwarderName != undefined && this.ForwarderName>=0)
        {            
            switch(this.ForwarderName){
                case 0:{
                    return "Apex";
                }
                case 1:{
                    return "Hecny";
                }
                case 2:{
                    return "Other";
                }
                case 3:{
                    return "OEC";
                }
                case 4:{
                    return "Hold";
                }
            }
        }
        return "";
    }
        
    public BookingDate_Date: Date | undefined;
    private bookingDate: string = "";
    public get BookingDate(){
        return this.bookingDate;
    }
    public set BookingDate(value: string){
        this.bookingDate = value;
        if (value)
            this.BookingDate_Date = new Date(value);
    }


    public Rate: number | undefined;    
    
    public ETD_Date: Date | undefined;
    public eTD: string = "";
    public get ETD(){
        return this.eTD;
    }
    public set ETD(value: string){
        this.eTD = value;
        if (value)
            this.ETD_Date = new Date(value);
    }
    
    public ETA_Date: Date | undefined;
    public eTA: string = "";
    public get ETA(){
        return this.eTA;
    }
    public set ETA(value: string){
        this.eTA = value;
        if (value)
            this.ETA_Date = new Date(value);
    }

    public PortOfDischarge: string;
    public DischargeStatus: number | undefined;
    public getDischargeStatusName() : string {
        if (this.DischargeStatus != undefined && this.DischargeStatus>=0)        
        {
            switch(this.DischargeStatus){
                case 0:{
                    return "Not arrived";
                }
                case 1:{
                    return "On vassel";
                }
                case 2:{
                    return "Ready for pick up";
                }
                case 3:{
                    return "On hold";
                }
            }
        }
        return "";
    }


    public ShippmentStatus: number | undefined;
    public getShippmentStatusName() : string {
        if (this.ShippmentStatus != undefined && this.ShippmentStatus>=0)
        {
            switch(this.ShippmentStatus){
                case 0:{
                    return "Please Accept";
                }
                case 1:{
                    return "Do not accept";
                }
                case 2:{
                    return "Hold the booking";
                }
                case 3:{
                    return "Change";
                }
            }
        }
        return "";
    }    

    public ConfirmDate_Date: Date | undefined;
    public confirmDate: string = "";
    public get ConfirmDate(){
        return this.confirmDate;
    }
    public set ConfirmDate(value: string){
        this.confirmDate = value;
        if (value)
            this.ConfirmDate_Date = new Date(value);
    }


    
    public GateIn_Date: Date | undefined;
    public gateIn: string = "";
    public get GateIn(){
        return this.gateIn;
    }
    public set GateIn(value: string){
        this.gateIn = value;
        if (value)
            this.GateIn_Date = new Date(value);
    }
    
    public EmptyDate_Date: Date | undefined;
    public emptyDate: string = "";
    public get EmptyDate(){
        return this.emptyDate;
    }
    public set EmptyDate(value: string){
        this.emptyDate = value;
        if (value)
            this.EmptyDate_Date = new Date(value);
    }
    
    public GateOut_Date: Date | undefined;
    public gateOut: string = "";
    public get GateOut(){
        return this.gateOut;
    }
    public set GateOut(value: string){
        this.gateOut = value;
        if (value)
            this.GateOut_Date = new Date(value);
    }
    
    public BillDate_Date: Date | undefined;
    public billDate: string = "";
    public get BillDate(){
        return this.billDate;
    }
    public set BillDate(value: string){
        this.billDate = value;
        if (value)
            this.BillDate_Date = new Date(value);
    }
    
    public Searchable: string;

    public FactoryStatusNeedsToHaveReadyToGO: boolean;

    public RowNumberInTable: number = 0;
    public Note: string;
} 