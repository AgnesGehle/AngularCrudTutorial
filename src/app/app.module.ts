import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ReactiveFormsModule } from "@angular/forms";
import { RadioButtonModule } from "primeng/radiobutton";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule} from "primeng/divider";
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MessageService} from "primeng/api";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptorService } from "./services/auth-interceptor.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeListComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    HttpClientModule,
    MenubarModule,
    DividerModule,
    ToastModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
