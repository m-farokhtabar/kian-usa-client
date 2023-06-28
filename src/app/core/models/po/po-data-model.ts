import { PoDataExcelModel } from "./po-data-excel-model";

export class PoDataModel {

    constructor(ExcelData: PoDataExcelModel[], ColumnsHavePermission: string[]) {        
        this.ExcelData = ExcelData;
        this.ColumnsHavePermission = ColumnsHavePermission;        
    }
    public ExcelData: PoDataExcelModel[];
    public ColumnsHavePermission: string[];
}