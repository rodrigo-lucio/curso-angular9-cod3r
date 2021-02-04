import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styleUrls: ['./occurrence.component.css']
})
export class OccurrenceComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Ocorrências',
      icon: 'departure_board',
      routeUrl: '/occurrence'
    }
  }

  ngOnInit(): void {
  }

  navigateToOccurrenceCreate(): void {
    this.router.navigate(['/occurrence/create']);
  }

}
