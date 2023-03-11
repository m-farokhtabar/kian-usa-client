import {GridCell} from "../viewmodel/grid.viewmodel";
import {Tools} from "../../../helper/tools";
import {AuthService} from "../../../../core/models/account/auth.service";

export class GridHelper {
    public static GetCurrentPrice(Cell: GridCell, account: AuthService) {
        if (Array.isArray(Cell.Prices) && Cell.Prices.length > 0) {
            if (Cell.Prices.length == 1) {
                if (account.HasPermissionToShowPrice(Cell.PricePermissions, Cell.PriceNames[0]))
                    return Tools.GetPriceFormat(Cell.Prices[0]);
            } else {
                if (Cell.Prices[1] != undefined && Cell.Prices[1] > 0) {
                    if (account.HasPermissionToShowPrice(Cell.PricePermissions, Cell.PriceNames[1]))
                        return Tools.GetPriceFormat(Cell.Prices[1]);
                } else {
                    if (account.HasPermissionToShowPrice(Cell.PricePermissions, Cell.PriceNames[0]))
                        return Tools.GetPriceFormat(Cell.Prices[0]);
                }
            }
        }
        return "";
    }

    public static GetFirstPrice(Cell: GridCell, account: AuthService) {
        if (Array.isArray(Cell.Prices) && Cell.Prices.length > 0 && account.HasPermissionToShowPrice(Cell.PricePermissions, Cell.PriceNames[0]))
            return Tools.GetPriceFormat(Cell.Prices[0]);
        return "";
    }

    public static HasMoreThanOnePrice(Cell: GridCell, account: AuthService) {
        return Array.isArray(Cell.Prices) && Cell.Prices.length > 1 && Cell.Prices[1] != undefined && Cell.Prices[1] > 0 &&
            account.HasPermissionToShowPrice(Cell.PricePermissions, Cell.PriceNames[1]);
    }
}