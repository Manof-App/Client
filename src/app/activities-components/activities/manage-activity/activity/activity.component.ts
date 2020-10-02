import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../../../models/Activity';
import { Location } from '../../../../models/Location';
import { environment, globals } from '../../../../../environments/environment';

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
  // Variables Declaration - Do Not Modified
  model: NgbDateStruct;
  generalAreaForm: FormGroup;

  id: string;
  markers: any;
  location: Location;
  isEditing: boolean;
  newActivity: Activity;

  globs = globals;

  guides: string[] = ['י', 'יא', 'יב'];
  students: string[] = ['א', 'ב', 'ג'];
  types: string[] = ['תנועתי', 'חברתי'];
  managers: string[] = ['נח לובקו', 'צח ברק', 'עומר לובקו'];

  @Input() tabNumber: number;
  @Output() triggerTab = new EventEmitter<any>();
  // End Of Variables Declaration

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapsService,
    private activityService: ActivitiesService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private assignmentsComponent: AssignmentsComponent
  ) {}

  // On Initialization Life Cycle
  ngOnInit(): void {
    this.isEditing = false;
    this.id = this.route.snapshot.queryParams.id;

    this.initObject();
    this.initForms();

    this.triggerTab.emit(this.globs.activityTab);
    this.globs.activityTab = 1;

    this.activityService.getActivity(this.id).subscribe((activity) => {
      if (activity != undefined) {
        this.generalAreaForm.controls.name.setValue(activity.activityName);

        this.generalAreaForm.controls.manager.setValue(
          this.managers.findIndex((val) => val === activity.manager)
        );

        this.generalAreaForm.controls.startDate.setValue(activity.startDate);
        this.generalAreaForm.controls.endDate.setValue(activity.endDate);

        this.generalAreaForm.controls.targetedStudents.setValue(
          this.students.findIndex((val) => val === activity.targetedStudents)
        );

        this.generalAreaForm.controls.targetedGuides.setValue(
          this.guides.findIndex((val) => val === activity.targetedGuides)
        );

        this.generalAreaForm.controls.crewPreparationDate.setValue(
          activity.crewPreparationDate
        );

        this.generalAreaForm.controls.type.setValue(
          this.types.findIndex((val) => val === activity.type)
        );

        this.generalAreaForm.controls.preparationsDate.setValue(
          activity.preparationsDate
        );
        this.generalAreaForm.controls.targetAudienceDetails.setValue(
          activity.targetAudienceDetails
        );

        this.generalAreaForm.controls.summarizeDate.setValue(
          activity.summarizeDate
        );
        this.generalAreaForm.controls.isScheduled.setValue(
          activity.isScheduled
        );

        this.location = activity.mapLocation;
      } else {
        this.getUserLocation();
      }
    });
  }

  // Initialize Class Objects
  initObject = () => {
    this.newActivity = {
      _id: '',
      activityName: '',
      manager: '',
      startDate: new Date(),
      endDate: new Date(),
      targetedStudents: '',
      targetedGuides: '',
      crewPreparationDate: new Date(),
      type: '',
      preparationsDate: new Date(),
      targetAudienceDetails: '',
      summarizeDate: new Date(),
      isScheduled: '',
      mapLocation: {
        latitude: -1,
        longitude: -1,
        city: '',
        principalSubdivision: '',
      },
    };

    this.location = {
      latitude: -1,
      longitude: -1,
      city: '',
      principalSubdivision: '',
    };
  };

  // Initialize Form Variables
  initForms() {
    this.generalAreaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      manager: [''],

      startDate: [''],
      endDate: [''],

      targetedStudents: [''],
      targetedGuides: [''],

      crewPreparationDate: [''],
      type: [''],

      preparationsDate: [''],
      targetAudienceDetails: [''],

      summarizeDate: [''],
      isScheduled: [''],
    });
  }

  // Handle User Submitting Form
  onSubmit = ({ value }) => {
    this.newActivity._id = this.id;
    this.newActivity.activityName = value.name;
    this.newActivity.endDate = value.endDate;
    this.newActivity.mapLocation = this.location;
    this.newActivity.startDate = value.startDate;
    this.newActivity.isScheduled = value.isScheduled;
    this.newActivity.summarizeDate = value.summarizeDate;
    this.newActivity.preparationsDate = value.preparationsDate;
    this.newActivity.crewPreparationDate = value.crewPreparationDate;
    this.newActivity.targetAudienceDetails = value.targetAudienceDetails;

    this.newActivity.type = this.types[value.type];
    this.newActivity.manager = this.managers[value.manager];
    this.newActivity.targetedGuides = this.guides[value.targetedGuides];
    this.newActivity.targetedStudents = this.students[value.targetedStudents];

    let SHARED_DATA = {
      activityId: this.newActivity._id,
      startDate: this.newActivity.startDate,
    };

    // Update Data In Service
    this.assignmentsService.changeData(SHARED_DATA);

    // Initialize Assignment Component
    // This Action Will Trigger Assignment
    // Component. Therefore We'll Be Able Add Up
    // New Assignments To Our Newly Created Activity
    this.assignmentsComponent.ngOnInit();

    // Save Activity Details To Firebase
    this.activityService.addActivityToFireBase(this.newActivity);

    this.tabNumber = 2;
    this.triggerTab.emit(this.tabNumber);
  };

  // Pin The Location The User has Chosen
  onChoseLocation = (event) => {
    this.mapService
      .getLocationDetails(event.coords.lat, event.coords.lng)
      .subscribe((location) => {
        this.location = location;
        console.log(location);
      });
  };

  // Get User Current Location
  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapService
          .getLocationDetails(
            position.coords.latitude,
            position.coords.longitude
          )
          .subscribe((location) => {
            this.location = location;
          });
      });
    }
  };

  // Generated New Activity UUID
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
