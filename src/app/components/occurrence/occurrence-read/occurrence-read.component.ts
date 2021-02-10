import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { OccurrenceService } from './../occurrence.service';
import { Occurrence } from './../ocurrence.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-occurrence-read',
  templateUrl: './occurrence-read.component.html',
  styleUrls: ['./occurrence-read.component.css']
})
export class OccurrenceReadComponent implements OnInit {

  // occurrences: Occurrence[];
  displayedColumns: string[] = ['id', 'description', 'vehiclePlate', 'date', 'action'];

  occurrencesData: Occurrence[] = [];
  occurrences = null;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 30, 35];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private occurrenceService: OccurrenceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.occurrenceService.read().subscribe(occurrences => {
      this.occurrencesData = occurrences;
      this.occurrences = new MatTableDataSource<Occurrence>(this.occurrencesData);
      this.occurrences.paginator = this.paginator;
    });
  }

  deleteConfirm(id: number): void {
    const dialogData = new ConfirmDialogModel("Confirmação", "Deseja realmente remover?");
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.occurrenceService.delete(id).subscribe(() => {
          this.occurrenceService.showMessage("Ocorrência removida com sucesso");
          this.refresh();
        });
      }
    });
  }

  updateOccurrence(id: number): void {
    this.router.navigate([`/occurrence/${id}`]);
  }

  onChangePage(event: PageEvent) {
    // console.log('aaaa ' + event.pageSize);
    console.log('aaaa ' + event.pageIndex);

  }

}


