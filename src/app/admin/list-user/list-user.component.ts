import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserComponent } from '../add-user/add-user.component';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { UserDTO } from 'src/app/DTO/UserDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

  public users: UserDTO[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbCommunicationService) {
    this.route.queryParams.subscribe(params => {
      if (params.user) {
        console.log('User: ', params.user);
      }
      console.log(params);
    });
  }

  displayedColumns: string[] = ['position', 'name', 'role', 'expiryDate', 'actions'];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  openAddUserDialog(): void {
    const openAddUserDialogRef = this.dialog.open(AddUserComponent, {
      width: '650px',
    });

    openAddUserDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public formatDate(d: string): string {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.db.UserAll().subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private handleData(data: UserDTO[]) {
    console.log(data);
    this.users = data;
    this.dataSource.data = data;
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
  }

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

}
