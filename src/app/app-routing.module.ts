import { OccurrenceUpdateComponent } from './components/occurrence/occurrence-update/occurrence-update.component';
import { OccurrenceCreateComponent } from './components/occurrence/occurrence-create/occurrence-create.component';
import { OccurrenceComponent } from './views/occurrence/occurrence.component';

import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "occurrence",
    component: OccurrenceComponent
  },
  {
    path: "occurrence/create",
    component: OccurrenceCreateComponent
  },
  {
    path: "occurrence/update/:id",
    component: OccurrenceUpdateComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
