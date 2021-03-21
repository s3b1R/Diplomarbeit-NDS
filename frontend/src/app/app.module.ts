import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CapacityComponent } from './capacity/capacity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DateFnsConfigurationService, DateFnsModule} from 'ngx-date-fns';
import { de } from 'date-fns/locale';
import { NgxMatDateFnsDateModule} from 'ngx-mat-datefns-date-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const germanConfig = new DateFnsConfigurationService();
germanConfig.setLocale(de);

@NgModule({
  declarations: [
    AppComponent,
    CapacityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DateFnsModule.forRoot(),
    NgxMatDateFnsDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: DateFnsConfigurationService, useValue: germanConfig }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
