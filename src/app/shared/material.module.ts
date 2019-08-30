import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule, // for grid column
  MatRadioModule, //mat-radio-group - radio button
  MatDatepickerModule, //matDatepicker - datepicker
  MatNativeDateModule, //required for datepicker
  MatCheckboxModule, //mat-checkbox - checkbox
  MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatListModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule, // for grid column
    MatRadioModule, //mat-radio-group - radio button
    MatDatepickerModule, //matDatepicker - datepicker
    MatNativeDateModule, //required for datepicker
    MatCheckboxModule, //mat-checkbox - checkbox
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
