export class PoSaveResultModel {
    constructor(
        PoNumber: string,
        ConfirmDate: string,
        StatusDate: string,
        BookingDate: string,
        Message: string,
        FactoryStatusNeedsToHaveReadyToGO: boolean,
        Rate: number | undefined
    ) {
        this.PoNumber = PoNumber
        this.ConfirmDate = ConfirmDate
        this.StatusDate = StatusDate
        this.BookingDate = BookingDate
        this.Message = Message
        this.FactoryStatusNeedsToHaveReadyToGO = FactoryStatusNeedsToHaveReadyToGO;
        this.Rate = Rate;
    } 
    public PoNumber: string;
    public ConfirmDate: string;
    public StatusDate: string;
    public BookingDate: string;
    public Message: string;
    public FactoryStatusNeedsToHaveReadyToGO: boolean;
    public Rate: number | undefined;
}