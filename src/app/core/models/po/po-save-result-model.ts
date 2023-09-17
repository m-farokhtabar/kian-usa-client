export class PoSaveResultModel {
    constructor(
        PoNumber: string,
        ConfirmDate: string,
        StatusDate: string,
        BookingDate: string,
        Message: string,
        FactoryStatusNeedsToHaveReadyToGO: boolean
    ) {
        this.PoNumber = PoNumber
        this.ConfirmDate = ConfirmDate
        this.StatusDate = StatusDate
        this.BookingDate = BookingDate
        this.Message = Message
        this.FactoryStatusNeedsToHaveReadyToGO = FactoryStatusNeedsToHaveReadyToGO;
    } public PoNumber: string;
    public ConfirmDate: string;
    public StatusDate: string;
    public BookingDate: string;
    public Message: string;
    public FactoryStatusNeedsToHaveReadyToGO: boolean;
}