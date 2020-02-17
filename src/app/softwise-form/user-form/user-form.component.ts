import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SoftwiseResponse, TestFormService } from '../services/test-form.service';
import { finalize, first } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  private componentDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public softwiseFormParamGroup: QueryParamGroup;
  public submissionForm = new FormGroup({
    firstName: new FormControl('', [this.firstNameWhitespaceValidator]),
    lastName: new FormControl(''),
    date: new FormControl('', Validators.required)
  });

  constructor(public testFormService: TestFormService, private queryParamBuilder: QueryParamBuilder) { }

  ngOnInit(): void {
    this.softwiseFormParamGroup = this.queryParamBuilder.group({
      firstName: this.queryParamBuilder.stringParam('firstName'),
      lastName: this.queryParamBuilder.stringParam('lastName'),
      date: this.queryParamBuilder.stringParam('date'),
    });

    this.softwiseFormParamGroup.valueChanges
      .pipe(first())
      .subscribe(form => this.submissionForm.patchValue(form));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get firstNameInput() { return this.submissionForm.get('firstName'); }
  get lastNameInput() { return this.submissionForm.get('lastName'); }
  get dateInput() { return this.submissionForm.get('date'); }

  public onSubmit() {
    const { firstName: firstNameControl, lastName: lastNameControl, date: dateControl } = this.submissionForm.controls;

    this.submissionForm.disable();
    this.testFormService
      .sendForm(firstNameControl.value, lastNameControl.value, dateControl.value)
      .pipe(
        finalize(() => this.submissionForm.enable())
      )
      .subscribe(
        (response: SoftwiseResponse) => {
          this.testFormService.setState(response);
        },
        ({ error: { error: serverErrors } }: { error: SoftwiseResponse }) => {
          for (const [inputKey, errors] of Object.entries(serverErrors)) {
            switch (inputKey) {
              case 'date':        this.setServerError(this.dateInput, errors); break;
              case 'first_name':  this.setServerError(this.firstNameInput, errors); break;
              case 'last_name':   this.setServerError(this.lastNameInput, errors); break;
            }
          }
        });
  }

  private setServerError(control: AbstractControl, errors) {
    control.setErrors({serverErrors : errors});
  }

  private firstNameWhitespaceValidator(control: AbstractControl): {[key: string]: any} | null {
      const whitespace = /\s/i.test(control.value);

      return whitespace ? { whitespace: {value: control.value}} : null;
  }

}
