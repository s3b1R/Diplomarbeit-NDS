import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CapacityComponent} from './components/capacity/capacity.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateFnsConfigurationService, DateFnsModule} from 'ngx-date-fns';
import {de} from 'date-fns/locale';
import {NgxMatDateFnsDateModule} from 'ngx-mat-datefns-date-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CapacityMassmutationComponent} from './components/capacity-massmutation/capacity-massmutation.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {HeaderComponent} from './shared/components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {ConfirmationDialogComponent} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {WorkloadComponent} from './components/workload/workload.component';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {OccupancyComponent} from './components/occupancy/occupancy.component';
import {PiComponent} from './components/pi/pi.component';
import {ComparisonComponent} from './components/comparison/comparison.component';
import {CapacityPipe} from './shared/pipes/capacity-pipe';
import {WorkloadPipe} from './shared/pipes/workload-pipe';
import {DeltaCapaLoad} from './shared/pipes/delta-capa-load';
import {SuccessComponent} from './shared/components/success/success.component';
import {FooterComponent} from './shared/components/footer/footer.component';

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
    WorkloadComponent,
    OccupancyComponent,
    PiComponent,
    ComparisonComponent,
    CapacityPipe,
    WorkloadPipe,
    DeltaCapaLoad,
    SuccessComponent,
    FooterComponent
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
    MatToolbarModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: DateFnsConfigurationService, useValue: germanConfig}
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
