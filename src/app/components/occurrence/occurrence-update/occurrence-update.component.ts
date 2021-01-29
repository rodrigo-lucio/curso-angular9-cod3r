import { Occurrence } from './../ocurrence.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OccurrenceService } from './../occurrence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occurrence-update',
  templateUrl: './occurrence-update.component.html',
  styleUrls: ['./occurrence-update.component.css']
})
export class OccurrenceUpdateComponent implements OnInit {


  public occurrence: Occurrence = {
    id: 0,
    description: "",
    date: "2020-11-17",
    vehiclePlate: "",
    repaired: true,
    repairDate: "2020-12-17",
    repairValue: 0
  }

  constructor(private occurrenceService: OccurrenceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.occurrenceService.readById(id).subscribe(occurrence => {
      this.occurrence = occurrence;
    });

  }

  updateOccurrence(): void {
    this.occurrenceService.update(this.occurrence).subscribe((teste) => {
      console.log(teste)
      this.occurrenceService.showMessage("Occorrência alterada com sucesso");
      this.router.navigate(['/occurrence']);
    });
  }

  cancel(): void {
    this.router.navigate(['/occurrence']);
  }

}
