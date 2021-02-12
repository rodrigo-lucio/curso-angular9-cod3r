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

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 30, 50];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private occurrenceService: OccurrenceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.refresh(0, 10);
  }

  refresh(page: number = 0, limit: number = 0): void {
    this.occurrenceService.read(page, limit).subscribe(occurrences => {
      console.log(occurrences);
      this.occurrencesData = occurrences.body;
      this.length = occurrences.headers.get('X-Total-Count')
      this.occurrences = new MatTableDataSource<Occurrence>(this.occurrencesData);
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
    this.refresh(event.pageIndex, event.pageSize);
  }


}


