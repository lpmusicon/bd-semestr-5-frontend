import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaBadanComponent } from './lista-badan/lista-badan.component';
import { ZatwierdzBadanieComponent } from './zatwierdz-badanie/zatwierdz-badanie.component';
import { AnulujBadanieComponent } from './anuluj-badanie/anuluj-badanie.component';
import { LaboratoriumManagerRoutingModule } from './laboratorium-manager-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ListItemManageComponent } from './lista-badan/list-item-manage/list-item-manage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PastExaminationsComponent } from './lista-badan/past-examinations/past-examinations.component';


@NgModule({
  declarations: [
    ListaBadanComponent,
    ZatwierdzBadanieComponent,
    AnulujBadanieComponent,
    ListItemManageComponent,
    PastExaminationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LaboratoriumManagerRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AnulujBadanieComponent,
    ZatwierdzBadanieComponent
  ]
})
export class LaboratoriumManagerModule {
}
