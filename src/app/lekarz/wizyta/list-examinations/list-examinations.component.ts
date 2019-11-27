import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Examination {
  id: number;
  docName: string;
  type: string;
  result: string;
  date: any;
}

@Component({
  selector: 'app-list-examinations',
  templateUrl: './list-examinations.component.html',
  styleUrls: ['./list-examinations.component.scss']
})
export class ListExaminationsComponent implements OnInit {

  constructor() { }

  @Input("patient") pat: any;

  public Examinations: Examination[] = [];
  examinationsDisplayedColumns: string[] = ['position', 'doc_name', 'type', 'result', 'date'];
  examinations = new MatTableDataSource(this.Examinations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.examinations.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    
    this.examinations.paginator = this.paginator;
    this.examinations.sort = this.sort;
  }

}