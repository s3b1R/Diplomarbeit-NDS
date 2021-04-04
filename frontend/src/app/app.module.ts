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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { CapacityMassmutationComponent } from './capacity-massmutation/capacity-massmutation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { WorkloadComponent } from './workload/workload.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';

const germanConfig = new DateFnsConfigurationService();
germanConfig.setLocale(de);

@NgModule({
  declarations: [
    AppComponent,
    CapacityComponent,
    CapacityMassmutationComponent,
    HeaderComponent,
    UserComponent,
    ConfirmationDialogComponent,
    WorkloadComponent
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
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatDialogModule,
        NgxCsvParserModule,
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: DateFnsConfigurationService, useValue: germanConfig }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
