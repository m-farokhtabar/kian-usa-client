export class PoPermissionColumn {
    constructor(ColName: string, IsWritable: boolean) {
        this.ColName = ColName
        this.IsWritable = IsWritable
    } public ColName: string
    public IsWritable: boolean
}