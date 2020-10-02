import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css'],
})
export class OfficialComponent implements OnInit {
  officialForm: FormGroup;
  formDirective: FormGroupDirective;

  @Input() official;
  activityId: string;
  dialogConfig: any;

  openOrCloseConfirmBox: boolean;

  date: Date;
  isMobile: boolean = false;
  showConfirmBox: boolean = false;
  userData: any;

  content: string = 'לשמור את השינויים?';

  jobs = [
    { id: '1', value: 'רכז הדרכה' },
    { id: '2', value: 'מנהלן' },
    { id: '3', value: 'אחר' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.queryParams.id;

    this.initForm();

    if (!this.official) {
      this.official = {};
    } else {
      this.officialForm.controls.job.setValue(
        this.convertJobNameToId(this.official.job)
      );

      this.officialForm.controls.notes.setValue(this.official.notes);
      this.officialForm.controls.jobTitle.setValue(this.official.jobTitle);

      const displayDate = `${this.official.requiredDate.month}/${this.official.requiredDate.day}/${this.official.requiredDate.year}`;
      this.date = new Date(displayDate);

      this.officialForm.controls.managerApproval.setValue(
        this.official.managerApproval
      );

      this.officialForm.controls.extraHoursNeeded.setValue(
        this.official.extraHoursNeeded
      );

      this.officialForm.controls.managerDepartmentApproval.setValue(
        this.official.managerDepartmentApproval
      );
    }
  }

  initForm = () => {
    this.officialForm = this.formBuilder.group({
      $key: new FormControl(null),
      job: new FormControl(`0`),
      jobTitle: new FormControl('', Validators.required),
      requiredDate: new FormControl(''),
      extraHoursNeeded: new FormControl(''),
      managerApproval: new FormControl(false),
      notes: new FormControl(''),
      managerDepartmentApproval: new FormControl(false),
    });
  };

  onSubmit = ({ value }) => {
    this.showConfirmBox = !this.showConfirmBox;
    this.userData = value;
  };

  handleUserAnswer = (userAnswer) => {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      this.official.job = this.applyJobTitle(this.userData.job);
      this.official.jobTitle = this.userData.jobTitle;
      this.official.requiredDate = this.userData.requiredDate = this.toObjectMap(
        new Date(this.userData.requiredDate)
      );
      this.official.extraHoursNeeded = this.userData.extraHoursNeeded;
      this.official.managerApproval = this.userData.managerApproval;
      this.official.managerDepartmentApproval = this.userData.managerDepartmentApproval;
      this.official.notes = this.userData.notes;
      /* If the action add a new official */
      if (!this.official.id) {
        this.official.id = this.generateId();
        this.dialogRef.close({ event: 'save', data: this.official });
      } else {
        /* If the action edit a official */
        this.dialogRef.close({ event: 'edit', data: this.official });
      }
    }
  };

  /* Clear form inputs */
  clearForm = () => {
    this.officialForm.reset();
  };

  /* Converts a given id to a job title string */
  applyJobTitle = (currId): any => {
    let objectValue;
    this.jobs.forEach((obj) => {
      if (obj.id == currId) {
        objectValue = obj.value;
      }
    });
    return objectValue;
  };

  // Converts A Given Job String To An Id
  convertJobNameToId = (currentJob): any => {
    let id;
    this.jobs.forEach((obj) => {
      if (obj.value == currentJob) {
        id = obj.id;
      }
    });
    return id;
  };

  toObjectMap = (date: Date): Object => {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  };

  // Generates New Id For A Specific Official Within An Activity
  generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}
