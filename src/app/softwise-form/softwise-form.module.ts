import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestFormService } from './services/test-form.service';
import { QueryParamModule } from '@ngqp/core';


@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QueryParamModule
  ],
  providers: [ TestFormService ]
})
export class SoftwiseFormModule { }
