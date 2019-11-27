import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { BadanieFizykalneComponent } from '../badanie-fizykalne/badanie-fizykalne.component';
import { BadanieLaboratoryjneComponent } from '../badanie-laboratoryjne/badanie-laboratoryjne.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitDTO } from 'src/app/DTO/VisitDTO';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';


@Component({
  selector: 'app-wizyta',
  templateUrl: './wizyta.component.html',
  styleUrls: ['./wizyta.component.scss']
})
export class WizytaComponent implements OnInit {
  public visit: PatientVisitDTO;
  public visits: VisitDTO[];
  public visitId: number;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
  ) {}

  openAddExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieFizykalneComponent, {
      width: '650px',
      data: { patId: '' }
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddLabExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieLaboratoryjneComponent, {
      width: '650px',
      data: { patId: '' }
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private handleParams(a) {
    this.visitId = a.id;
    this._db.Visit(this.visitId).subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    })
  }

  private handleData(visit: PatientVisitDTO) {
    console.log(visit);
    this.visit = visit;
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Description: ['', Validators.required],
      Diagnosis: ['', Validators.required]
    });
  }

  //TODO replace any
  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db
    
  }

  ngOnInit() {
    this.visit = {
      Id: 0,
      RegisterDate: new Date(),
      Patient: {
        PatientId: 0,
        Name: '',
        Lastname: '',
        PESEL: ''
      }
    }
    this.buildForm();
    this.route.params.subscribe({
      next: this.handleParams.bind(this)
    });
  }
  
  private handleResponse(auth: any): void {
    this.openSnackBar("Wizyta pacjenta " + "TODO" + " została zakończona", "Ok");
  }

  private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar("Nie znaleziono wizyty", "Ok");
        break;
      case 400:
        //Złe dane
        this.openSnackBar("Niepoprawne dane/brak danych", "Ok");
        console.warn("Wrong/empty data");
        break;
      default:
        //Nieokreślony błąd
        this.openSnackBar("Wystąpił nieokreślony błąd", "Ok");
        console.warn("Generic error");
        break;
    }
    console.warn(err);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
