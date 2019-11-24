import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

export interface examType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-badanie-fizykalne',
  templateUrl: './badanie-fizykalne.component.html',
  styleUrls: ['./badanie-fizykalne.component.scss']
})
export class BadanieFizykalneComponent implements OnInit {

  constructor(
    private openAddExaminationRef: MatDialogRef<BadanieFizykalneComponent>, 
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelAddExamination() {
    this.openAddExaminationRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openAddExaminationRef.close({ reason: "save" });
    this.openSnackBar("Badanie zostało wykonane", "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  examTypes: examType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];

}
