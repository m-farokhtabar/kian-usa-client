import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AccountGrpcService} from "../../../core/services/account-grpc.service";
import {AuthService} from "../../../core/models/account/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('LoginModelCloseButton') ModelCloseButton: ElementRef | null = null;
  constructor(private account: AuthService) { }

  ngOnInit(): void {
  }

  OnSubmit(Form: NgForm) {
    if (Form.valid) {
      const AccountService = new AccountGrpcService(null);
      AccountService.Login(Form.value.Username,Form.value.Password).then(data => {
        this.ModelCloseButton?.nativeElement.click();
        this.account.Set(data);
        Form.resetForm();
      }).catch(ex => {this.account.Delete(); alert(ex);});
    }
  }
}
