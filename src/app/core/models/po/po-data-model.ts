import { PoDataExcelModel } from "./po-data-excel-model";
import { PoPermissionColumn } from "./po-permission-column";

export class PoDataModel {

    constructor(ExcelData: PoDataExcelModel[], ColumnsHavePermission: PoPermissionColumn[]) {        
        this.ExcelData = ExcelData;
        this.ColumnsHavePermission = ColumnsHavePermission;        
    }
    public ExcelData: PoDataExcelModel[];
    public ColumnsHavePermission: PoPermissionColumn[];
}