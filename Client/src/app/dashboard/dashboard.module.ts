import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { CompanyComponent } from './company/company.component';
import { CartComponent } from '../cart/cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ThemeModule, DashboardRoutingModule, FormsModule],
  declarations: [DashboardComponent, CompanyComponent, CartComponent],
  entryComponents: [],
  providers: []
})
export class DashboardModule { }
