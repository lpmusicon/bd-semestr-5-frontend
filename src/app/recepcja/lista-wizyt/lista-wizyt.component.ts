import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AnulujWizyteComponent } from '../anuluj-wizyte/anuluj-wizyte.component';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { VisitDTO } from 'src/app/DTO/VisitDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';
import { GenericVisitDTO } from 'src/app/DTO/GenericVisitDTO';

@Component({
  selector: 'app-lista-wizyt',
  templateUrl: './lista-wizyt.component.html',
  styleUrls: ['./lista-wizyt.component.scss']
})
export class ListaWizytComponent implements OnInit {
  @Input('element') public visit: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private db: DbCommunicationService) {
  }

  public pastVisits: GenericVisitDTO[] = [];
  public Visits: PatientVisitDTO[];

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

  displayedColumns: string[] = ['patientVisitId', 'patient', 'doctor', 'registerDate', 'actions'];
  dataSource = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openStartVisitDialog(data: PatientVisitDTO): void {
    this.router.navigate([`/lekarz/wizyta/${data.patientVisitId}`]);
  }

  private loadData() {
    this.db.VisitRegisteredAll().subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });

    this.db.VisitPast().subscribe({
      next: this.handlePast.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handlePast(data: GenericVisitDTO[]) {
    this.pastVisits = data;
  }

  private handleData(data: PatientVisitDTO[]) {
    console.log(data);
    this.Visits = [];
    for (const visit of data) {
      this.Visits.push(visit);
    }
    this.dataSource = new MatTableDataSource(this.Visits);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      default:
        // Nieokreślony błąd
        console.warn('Generic error');
        break;
    }
    console.warn(err);
  }

  ngOnInit() {
    this.loadData();
  }

  openCancelVisitDialog(data: VisitDTO, e: HTMLElement): void {
    console.log('setting for: ', data);
    const openCancelVisitDialogRef = this.dialog.open(AnulujWizyteComponent, {
      width: '650px',
      data
    });

    openCancelVisitDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadData();
    });

  }

}
