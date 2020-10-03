import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../../../models/Activity';
import { Location } from '../../../../models/Location';
import { globals } from '../../../../../environments/environment';

import { AssignmentsComponent } from '../../assignments/assignments.component';

import { MapsService } from 'src/app/services/google-maps/maps.service';
import { ActivitiesService } from '../../../../services/activities/activities.service';
import { AssignmentsService } from '../../../../services/assignments/assignments.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [AssignmentsComponent],
})
export class ActivityComponent implements OnInit {
  // Variables declaration - Do not modified!!
  model: NgbDateStruct;
  generalAreaForm: FormGroup;

  id: string;
  markers: any;
  location: Location;
  isEdit: boolean;
  activity: Activity;

  globs = globals;

  guides: string[] = ['י', 'יא', 'יב'];
  students: string[] = ['א', 'ב', 'ג'];
  types: string[] = ['תנועתי', 'חברתי'];
  managers: string[] = ['נח לובקו', 'צח ברק', 'עומר לובקו'];

  @Input() tabNumber: number;
  @Output() triggerTab = new EventEmitter<any>();
  // End of variables declaration

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapsService,
    private activityService: ActivitiesService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private assignmentsComponent: AssignmentsComponent
  ) {}

  // On initialization component life cycle
  ngOnInit(): void {
    this.isEdit = false;
    this.id = this.route.snapshot.queryParams.id;

    this.initializeLocationObject();
    this.initForms();

    this.triggerTab.emit(this.globs.activityTab);
    this.globs.activityTab = 1;

    this.activityService.getActivity(this.id).subscribe(
      (data: Activity) => {
        this.generalAreaForm.controls.name.setValue(data.activityName);
        this.generalAreaForm.controls.manager.setValue(
          this.managers.findIndex((val) => val === data.manager)
        );

        this.generalAreaForm.controls.startDate.setValue(
          this.convertToObjectDate(data.startDate)
        );
        this.generalAreaForm.controls.endDate.setValue(
          this.convertToObjectDate(data.endDate)
        );

        this.generalAreaForm.controls.targetedStudents.setValue(
          this.students.findIndex((val) => val === data.targetedStudents)
        );

        this.generalAreaForm.controls.targetedGuides.setValue(
          this.guides.findIndex((val) => val === data.targetedGuides)
        );

        this.generalAreaForm.controls.preparationsDate.setValue(
          this.convertToObjectDate(data.preparationsDate)
        );

        this.generalAreaForm.controls.type.setValue(
          this.types.findIndex((val) => val === data.type)
        );

        this.generalAreaForm.controls.crewPreparationDate.setValue(
          this.convertToObjectDate(data.crewPreparationDate)
        );

        this.generalAreaForm.controls.targetAudienceDetails.setValue(
          data.targetAudienceDetails
        );

        this.generalAreaForm.controls.summarizeDate.setValue(
          this.convertToObjectDate(data.summarizeDate)
        );

        this.generalAreaForm.controls.isScheduled.setValue(
          data.isScheduled.toString()
        );
        this.location = data.mapLocation;
        this.activity = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Initialize map location object
  initializeLocationObject = () => {
    this.location = {
      latitude: -1,
      longitude: -1,
      city: '',
      principalSubdivision: '',
    };
  };

  // Initialize form variables
  initForms() {
    this.generalAreaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      manager: [''],

      startDate: [Date],
      endDate: [Date],

      targetedStudents: [''],
      targetedGuides: [''],

      crewPreparationDate: [Date],
      type: [''],

      preparationsDate: [Date],
      targetAudienceDetails: [''],

      summarizeDate: [Date],
      isScheduled: [false],
    });
  }

  // Handle User Submitting Form
  onSubmit = ({ value }) => {
    this.activity._id = this.id;

    this.activity.activityName = value.name;
    this.activity.manager = this.managers[value.manager];
    this.activity.startDate = this.convertToDate(value.startDate);
    this.activity.endDate = this.convertToDate(value.endDate);

    this.activity.targetedGuides = this.guides[value.targetedGuides];
    this.activity.targetedStudents = this.students[value.targetedStudents];
    this.activity.crewPreparationDate = this.convertToDate(
      value.crewPreparationDate
    );
    this.activity.type = this.types[value.type];

    this.activity.preparationsDate = this.convertToDate(value.preparationsDate);
    this.activity.targetAudienceDetails = value.targetAudienceDetails;
    this.activity.summarizeDate = this.convertToDate(value.summarizeDate);
    console.log(value.isScheduled);
    this.activity.isScheduled = value.isScheduled;

    this.activity.mapLocation = this.location;

    if (this.isEdit) {
      console.log(this.activity._id);
      this.activityService.updateActivity(this.activity).subscribe(
        (data: Activity) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // let SHARED_DATA = {
    //   activityId: this.activity._id,
    //   startDate: this.activity.startDate,
    // };

    // Update Data In Service
    //this.assignmentsService.changeData(SHARED_DATA);

    // Initialize Assignment Component
    // This Action Will Trigger Assignment
    // Component. Therefore We'll Be Able Add Up
    // New Assignments To Our Newly Created Activity
    // this.assignmentsComponent.ngOnInit();

    this.isEdit = !this.isEdit;
    this.tabNumber = 2;
    this.triggerTab.emit(this.tabNumber);
  };

  // Pin the location the user has chosen
  onChoseLocation = (event) => {
    this.mapService
      .getLocationDetails(event.coords.lat, event.coords.lng)
      .subscribe(
        (location) => {
          this.location = location;
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Get user current location
  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapService
          .getLocationDetails(
            position.coords.latitude,
            position.coords.longitude
          )
          .subscribe(
            (location) => {
              this.location = location;
            },
            (error) => {
              console.log(error);
            }
          );
      });
    }
  };

  // Convert date Object to type Date
  convertToDate(objDate: any): Date {
    return new Date(`${objDate.year}/${objDate.month}/${objDate.day + 1}`);
  }

  // Convert type Date to date Object
  convertToObjectDate(date: Date): Object {
    return {
      year: new Date(date).getUTCFullYear(),
      month: new Date(date).getUTCMonth() + 1,
      day: new Date(date).getUTCDate(),
    };
  }
}
