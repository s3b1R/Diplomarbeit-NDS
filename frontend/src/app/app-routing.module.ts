import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacityComponent } from './capacity/capacity.component';
import { CapacityMassmutationComponent } from './capacity-massmutation/capacity-massmutation.component';
import { UserComponent } from './user/user.component';
import { WorkloadComponent } from './workload/workload.component';
import { OccupancyComponent } from './occupancy/occupancy.component';
import { PiComponent } from './pi/pi.component';
import { ComparisonComponent } from './comparison/comparison.component';

const routes: Routes = [
  {path: '', redirectTo: '/comparison', pathMatch: 'full'},
  {path: 'capaview', component: CapacityComponent},
  {path: 'massmutation', component: CapacityMassmutationComponent},
  {path: 'user', component: UserComponent},
  {path: 'occupancy', component: OccupancyComponent},
  {path: 'workload', component: WorkloadComponent},
  {path: 'pi', component: PiComponent},
  {path: 'comparison', component: ComparisonComponent},
  {path: '**', redirectTo: '/comparison'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
