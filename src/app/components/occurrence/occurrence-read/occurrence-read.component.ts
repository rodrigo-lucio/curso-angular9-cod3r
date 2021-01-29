import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { OccurrenceService } from './../occurrence.service';
import { Occurrence } from './../ocurrence.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-occurrence-read',
  templateUrl: './occurrence-read.component.html',
  styleUrls: ['./occurrence-read.component.css']
})
export class OccurrenceReadComponent implements OnInit {

  occurrences: Occurrence[];
  displayedColumns: string[] = ['id', 'description', 'vehiclePlate', 'date', 'action'];

  constructor(private occurrenceService: OccurrenceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.occurrenceService.read().subscribe(occurrences => {
      this.occurrences = occurrences;
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

}
