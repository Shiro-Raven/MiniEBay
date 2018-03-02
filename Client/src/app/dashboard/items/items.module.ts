import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ItemsRoutingModule } from './items-routing.module';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ProductService } from '../../product.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';


@NgModule({
  imports: [ThemeModule, ItemsRoutingModule],
  declarations: [SmartTableComponent],
  providers: [ProductService , DatePipe, CurrencyPipe]
})
export class ItemsModule {}
