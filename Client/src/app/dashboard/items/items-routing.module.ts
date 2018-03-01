import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartTableComponent } from './smart-table/smart-table.component';

const routes: Routes = [
  { path: '', component: SmartTableComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {}
