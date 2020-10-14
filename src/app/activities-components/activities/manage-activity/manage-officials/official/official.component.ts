import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Official } from 'src/app/models/Official';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css'],
})
export class OfficialComponent implements OnInit {
  officialsForm: FormGroup;
  formDirective: FormGroupDirective;

  @Input() official: Official;
  id: string;
  dialogConfig: any;

  isMobile = false;
  showConfirmBox = false;
  userData: any;

  content = 'לשמור את השינויים?';

  jobs = [
    { id: '1', value: 'רכז הדרכה' },
    { id: '2', value: 'מנהלן' },
    { id: '3', value: 'אחר' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: DialogComponent,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;

    this.initForm();
    this.initOfficial();


    if (this.dialog.official) {
      this.official = this.dialog.official;
      this.officialsForm.controls.job.setValue(this.getJobId());
      this.officialsForm.controls.jobTitle.setValue(this.official.jobTitle);

      this.officialsForm.controls.requiredDate.setValue(new Date(this.official.requiredDate));
      this.officialsForm.controls.extraHoursNeeded.setValue(this.official.extraHoursNeeded);

      this.officialsForm.controls.managerApproval.setValue(this.official.managerApproval.toString());
      this.officialsForm.controls.managerDepartmentApproval.setValue(this.official.managerDepartmentApproval.toString());
      this.officialsForm.controls.notes.setValue(this.official.notes);
    }
  }

  initForm() {
    this.officialsForm = this.formBuilder.group({
      $key: new FormControl(null),
      job: new FormControl(`0`),
      jobTitle: new FormControl('', Validators.required),
      requiredDate: new FormControl('', Validators.required),
      extraHoursNeeded: new FormControl('', Validators.required),
      managerApproval: new FormControl(false),
      managerDepartmentApproval: new FormControl(false),
      notes: new FormControl(''),
    });
  }

  initOfficial() {
    this.official = {
      relatedActivityId: '-1',
      job: '',
      jobTitle: '',
      requiredDate: new Date(),
      extraHoursNeeded: -1,
      managerApproval: false,
      managerDepartmentApproval: false,
      notes: '',
    };
  }

  onSubmit({ value }) {
    this.showConfirmBox = !this.showConfirmBox;
    this.userData = value;

  }

  handleUserAnswer(userAnswer) {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      this.official.relatedActivityId = this.id;
      this.official.job = this.getJobValue(this.userData.job);
      this.official.jobTitle = this.userData.jobTitle;
      this.official.requiredDate = this.userData.requiredDate;
      this.official.extraHoursNeeded = this.userData.extraHoursNeeded;
      this.official.managerApproval = this.userData.managerApproval;
      this.official.managerDepartmentApproval = this.userData.managerDepartmentApproval;
      this.official.notes = this.userData.notes;

      if (!this.official._id) {
        // if the action add a new official
        this.dialogRef.close({ event: 'save', data: this.official });
      } else {
        // if the action edit a official
        this.dialogRef.close({ event: 'edit', data: this.official });
      }
    }
  }

  /* Clear form inputs */
  clearForm() {
    this.officialsForm.reset();
  }

  // Return the value key of the current job
  getJobId() {
    return this.jobs.find((obj) => obj.value === this.official.job).id;
  }

  getJobValue(id: string) {
    return this.jobs.find((obj) => obj.id === id).value;
  }

  // Convert type Date to date Object
  convertToObjectDate(date: Date): any {
    return {
      year: new Date(date).getUTCFullYear(),
      month: new Date(date).getUTCMonth() + 1,
      day: new Date(date).getUTCDate(),
    };
  }
}
