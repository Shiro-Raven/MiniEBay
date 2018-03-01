import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule} from './auth-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
  ]
})
export class AuthModule { }
