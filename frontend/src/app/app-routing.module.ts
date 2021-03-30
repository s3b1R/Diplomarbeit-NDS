import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CapacityComponent} from "./capacity/capacity.component";
import {CapacityMassmutationComponent} from "./capacity-massmutation/capacity-massmutation.component";

const routes: Routes = [
  {path: '', redirectTo: '/capaview', pathMatch: 'full'},
  {path: 'capaview', component: CapacityComponent},
  {path: 'massmutation', component: CapacityMassmutationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
