import { Occurrence } from '../ocurrence.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OccurrenceService } from '../occurrence.service';
import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-occurrence-crud',
  templateUrl: './occurrence-crud.component.html',
  styleUrls: ['./occurrence-crud.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class OccurrenceCreateComponent implements OnInit {


  public occurrence: Occurrence = {
    id: 0,
    description: "",
    date: null,
    vehiclePlate: "",
    repaired: true,
    repairDate: null,
    repairValue: 0
  }

  private isUpdate: boolean = false;

  constructor(private occurrenceService: OccurrenceService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true;
      this.occurrenceService.readById(id).subscribe(occurrence => {
        this.occurrence = occurrence;
      });
    }
  }

  createOccurrence(): void {
    this.occurrenceService.create(this.occurrence).subscribe(newOccurrence => {
      // Caso queira mostrar o retorno do post console.log(newOccurrence);
      this.occurrenceService.showMessage("Ocorrência Criada");
      this.router.navigate(["/occurrence"]);
    });
  }

  updateOccurrence(): void {
    this.occurrenceService.update(this.occurrence).subscribe((teste) => {
      console.log(teste)
      this.occurrenceService.showMessage("Occorrência alterada com sucesso");
      this.router.navigate(['/occurrence']);
    });
  }

  saveOccurrence(): void {
    if (this.isUpdate) {
      this.updateOccurrence();
    } else {
      this.createOccurrence();
    }
  }

  cancel(): void {
    this.router.navigate(["/occurrence"]);
  }

}
