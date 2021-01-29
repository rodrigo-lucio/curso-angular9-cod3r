import { Occurrence } from './../ocurrence.model';
import { Router } from '@angular/router';
import { OccurrenceService } from './../occurrence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occurrence-create',
  templateUrl: './occurrence-create.component.html',
  styleUrls: ['./occurrence-create.component.css']
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

  constructor(private occurrenceService: OccurrenceService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createOccurrence(): void {

    this.occurrenceService.create(this.occurrence).subscribe(newOccurrence => {
      // Caso queira mostrar o retorno do post console.log(newOccurrence);
      this.occurrenceService.showMessage("Ocorrência Criada");
      this.router.navigate(["/occurrence"]);
    });


  }

  cancel(): void {
    this.router.navigate(["/occurrence"]);
  }

}
