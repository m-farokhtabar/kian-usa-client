export class PoDataExcelModel {
    constructor(
        User: string,
        Date: string,
        Name: string,
        PONumber: string,
        EstimateNumber: string,
        RequiredShippingDate: string,
        CustomerPO: string,
        ItemGroup: string,
        Forwarder: string,
        IOR: string,
        ShipTo: string,
        ShippingCarrier: string,
        ContainerNumber: string,
        ETAAtPort: string,
        FactoryStatus: number | undefined,
        ReadyDate: string,
        FactoryBookingDate: string,
        DocumentsSendOutDate: string,
        ForwarderName: number | undefined,
        BookingDate: string,
        Rate: number | undefined,
        ETD: string,
        ETA: string,
        ConfirmeStatus: number | undefined,
        ConfirmDate: string,
        Searchable: string
    ) {        
        this.User = User;
        this.Date = Date;
        this.Name = Name;
        this.PONumber = PONumber;
        this.EstimateNumber = EstimateNumber;
        this.RequiredShippingDate = RequiredShippingDate;
        this.CustomerPO = CustomerPO;
        this.ItemGroup = ItemGroup;
        this.Forwarder = Forwarder;
        this.IOR = IOR;
        this.ShipTo = ShipTo;
        this.ShippingCarrier = ShippingCarrier;
        this.ContainerNumber = ContainerNumber;
        this.ETAAtPort = ETAAtPort;
        this.FactoryStatus = FactoryStatus;
        this.ReadyDate = ReadyDate;
        this.FactoryBookingDate = FactoryBookingDate;
        this.DocumentsSendOutDate = DocumentsSendOutDate;
        this.ForwarderName = ForwarderName;
        this.BookingDate = BookingDate;
        this.Rate = Rate;
        this.ETD = ETD;
        this.ETA = ETA;
        this.ConfirmeStatus = ConfirmeStatus;
        this.ConfirmDate = ConfirmDate;
        this.Searchable = Searchable;
        this.Searchable = "|" + User + "|" + Date+ "|" + Name + "|" + PONumber + "|" + EstimateNumber + "|" + RequiredShippingDate + "|" + CustomerPO + "|" +
        ItemGroup +  "|" + Forwarder + "|" + IOR + "|" + ShipTo + "|" + ShippingCarrier + "|" + ContainerNumber + "|" + ETAAtPort;
        this.Searchable = this.Searchable.toLowerCase();        
    } 
    public User: string;
    public Date: string;
    public Name: string;
    public PONumber: string;
    public EstimateNumber: string;
    public RequiredShippingDate: string;
    public CustomerPO: string;
    public ItemGroup: string;
    public Forwarder: string;
    public IOR: string;
    public ShipTo: string;
    public ShippingCarrier: string;
    public ContainerNumber: string;
    public ETAAtPort: string;

    public FactoryStatus: number | undefined;
    public ReadyDate: string;
    public FactoryBookingDate: string;
    public DocumentsSendOutDate: string;
    public ForwarderName: number | undefined;
    public BookingDate: string;
    public Rate: number | undefined;
    public ETD: string;
    public ETA: string;
    public ConfirmeStatus: number | undefined;
    public ConfirmDate: string;
    public Searchable: string;

    public IsContain(value: string) : boolean
    {
        return this.Searchable.indexOf("|"+value.toLowerCase())>0;
    }
}