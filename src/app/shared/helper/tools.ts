export class Tools {
    public static GetFileNameWithOutExtensionFromPath(path: string): string {
        if (path != null && path.trim() !== "") {
            const lastOne = path.lastIndexOf("/");
            if (lastOne > 0) {
                const fileName: string = path.substring(lastOne + 1);
                if (fileName != null && fileName.trim() !== "") {
                    const lastDot = fileName.lastIndexOf(".");
                    if (lastDot > -1)
                        return fileName.substring(0, lastDot);
                    else
                        return fileName;
                }
            }
        }
        return "";
    }

    public static GetPriceFormat(price: number | undefined): string {
        //return price != null ? "$" + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "";
        return price != null ? "$" + Math.ceil(price) : "";
    }
    public static SortImageFiles(ImageFiles: Array<string>) : Array<string>{
        return ImageFiles.sort((a,b)=> a.substring(a.lastIndexOf("_")).localeCompare(b.substring(b.lastIndexOf("_"))));
    }
    public static ComputeLandedPrice(Price: number | undefined,Cube: number | undefined,cost:number ){
        return Price! + (Cube! * (cost / 2350));
    }
}