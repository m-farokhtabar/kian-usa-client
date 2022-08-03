import {Constant} from "../../../helper/constant";

export class ImageSliderModel{
    constructor(Url: string, Alt: string) {
        this._Url = Constant.ImageHost + Url;
        this.Alt = Alt;
    }
    private _Url: string;
    get Url(): string {
        return this._Url;
    }

    set Url(value: string) {
        this._Url = Constant.ImageHost + value;
    }
    public Alt: string;
}