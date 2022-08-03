import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedDataService {
    public MenuNeedsToBeFixedTop:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public SetMenuStatus(NeedsToBeFixedTop: boolean){
        this.MenuNeedsToBeFixedTop.next(NeedsToBeFixedTop);
    }
}