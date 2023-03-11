import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedDataService {
    public MenuNeedsToBeFixedTop:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public SetMenuStatus(NeedsToBeFixedTop: boolean){
        this.MenuNeedsToBeFixedTop.next(NeedsToBeFixedTop);
    }

    private PriceTypeSource:BehaviorSubject<(number | null)> = new BehaviorSubject<(number | null)>(1); //1 => Sac
    public PriceTypeObservable = this.PriceTypeSource.asObservable();
    public SetPriceType(priceType: number | null){
        this.PriceTypeSource.next(priceType);
    }

}