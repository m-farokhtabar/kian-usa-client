import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../core/services/shareddata.service";
import {AuthService} from "../../core/models/account/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  private accSub: Subscription | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private sharedData: SharedDataService, private account: AuthService) {
  }

  ngOnInit(): void {
    this.accSub = this.account.UserToken.subscribe(acc => {
      if (!acc || acc == "" || !this.account.HasPermissionToPage("Check Out"))
        this.router.navigateByUrl('/');
    });
    this.account.IsValid();
    this.route.params.subscribe(() => {
      this.sharedData.SetMenuStatus(false)
    });
  }


  ngOnDestroy(): void {
    this.accSub?.unsubscribe();
  }
}
