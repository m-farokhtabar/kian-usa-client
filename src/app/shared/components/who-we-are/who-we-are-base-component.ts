export class WhoWeAreBaseComponent{
    public SideBarNeedsTobeHidden = false;
    OnThereIsNoMenuToShow(){        
        this.SideBarNeedsTobeHidden = true;
    }
}