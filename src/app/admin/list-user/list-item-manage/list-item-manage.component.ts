import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SetExpiryDateUserComponent } from '../../set-expiry-date-user/set-expiry-date-user.component';
import { ResetPasswordUserComponent } from '../../reset-password-user/reset-password-user.component';

@Component({
  selector: 'app-list-item-manage',
  templateUrl: './list-item-manage.component.html',
  styleUrls: ['./list-item-manage.component.scss']
})
export class ListItemManageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input("user-id") public userId: any;

  ngOnInit() {}

  openSetExpiryDateDialog(...args): void {
    console.log("setting for: ", this.userId);
    const openSetExpiryDateDialogRef = this.dialog.open(SetExpiryDateUserComponent, {
      width: '650px',
    });

    openSetExpiryDateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  openResetPasswordDialog(...args): void {
    console.log(args);
    console.log("setting for: ", this.userId);
    const openResetPasswordDialogRef = this.dialog.open(ResetPasswordUserComponent, {
      width: '650px',
    });

    openResetPasswordDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
