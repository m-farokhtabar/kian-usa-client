export class PoSaveResultModel {
    constructor(
        PoNumber: string,
        ConfirmDate: string,
        StatusDate: string,
        BookingDate: string,
        Message: string
    ) {
        this.PoNumber = PoNumber
        this.ConfirmDate = ConfirmDate
        this.StatusDate = StatusDate
        this.BookingDate = BookingDate
        this.Message = Message
    } public PoNumber: string;
    public ConfirmDate: string;
    public StatusDate: string;
    public BookingDate: string;
    public Message: string;

}