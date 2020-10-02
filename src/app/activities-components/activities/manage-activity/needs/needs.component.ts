import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Need } from '../../../../models/Need';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { NeedService } from '../../../../services/needs/needs.service';

@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.css'],
})
export class NeedsComponent implements OnInit {
  // Variables Declarations - Do Not Modified!
  needForm: FormGroup;

  id: string;
  newNeed: Need;
  message: string;

  responseType: string;
  showSpinner: boolean;
  showServerMessage: boolean;
  actionComplete: boolean;

  foodDescription: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק'];
  detailedGuidingItems: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק'];
  detailedClothingItems: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק'];
  // End Of Variables Declarations

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private needService: NeedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    this.actionComplete = this.showSpinner = false;

    this.initForms();
    this.initObject();

    this.needService.getNeed(this.id).subscribe((data) => {
      this.needForm.controls.isRequiredNotebookGuide.setValue(
        data.isRequiredNotebookGuide
      );

      this.needForm.controls.isRequiredGuideItems.setValue(
        data.isRequiredGuideItems
      );

      this.needForm.controls.isRequiredClothing.setValue(
        data.isRequiredClothing
      );

      this.needForm.controls.isRequiredVehicles.setValue(
        data.isRequiredVehicles
      );

      this.needForm.controls.isRequiredOfficeEquipment.setValue(
        data.isRequiredOfficeEquipment
      );

      this.needForm.controls.isRequiredDepotEquipment.setValue(
        data.isRequiredDepotEquipment
      );

      this.needForm.controls.isRequiredFood.setValue(data.isRequiredFood);

      this.needForm.controls.isRequiredTransportation.setValue(
        data.isRequiredTransportation
      );

      this.needForm.controls.isRequiredBidingPrice.setValue(
        data.isRequiredBidingPrice
      );

      this.needForm.controls.isRequiredExtraEquipment.setValue(
        data.isRequiredExtraEquipment
      );

      this.needForm.controls.isSleepingArrangements.setValue(
        data.isSleepingArrangements
      );

      this.needForm.controls.foodType.setValue(data.foodType);

      this.needForm.controls.detailedIGuideItems.setValue(
        this.detailedGuidingItems.findIndex(
          (val) => val === data.detailedIGuideItems
        )
      );

      this.needForm.controls.foodDescription.setValue(
        this.foodDescription.findIndex((val) => val === data.foodDescription)
      );

      this.needForm.controls.detailedClothing.setValue(
        this.detailedClothingItems.findIndex(
          (val) => val === data.detailedClothing
        )
      );

      this.needForm.controls.isSitesAvailable.setValue(data.isSitesAvailable);
    }),
      (error) => {
        console.log(error);
      };
  }

  // Forms Initialization
  initForms() {
    this.needForm = this.formBuilder.group({
      isRequiredNotebookGuide: [false],
      isRequiredGuideItems: [false],
      detailedIGuideItems: [''],
      isRequiredClothing: [false],
      detailedClothing: [''],
      isRequiredVehicles: [false],
      isRequiredOfficeEquipment: [false],
      isRequiredDepotEquipment: [false],
      isRequiredFood: [false],
      foodOrderingForm: [''],
      foodType: [false],
      foodDescription: '',
      isRequiredTransportation: [false],
      isSitesAvailable: [false],
      isSleepingArrangements: [false],
      sleepingLocation: '',
      isRequiredBidingPrice: [false],
      isRequiredExtraEquipment: [false],
    });
  }

  // Objects Initialization
  initObject() {
    this.newNeed = {
      id: '',
      activityId: '',
      isRequiredNotebookGuide: false,
      isRequiredGuideItems: false,
      detailedIGuideItems: '',
      isRequiredClothing: false,
      detailedClothing: '',
      isRequiredVehicles: false,

      isRequiredOfficeEquipment: false,
      isRequiredDepotEquipment: false,
      isRequiredFood: false,
      foodOrderingForm: false,
      foodType: false,
      foodDescription: '',

      isRequiredTransportation: false,
      isSitesAvailable: false,
      isSleepingArrangements: false,
      sleepingLocation: '',
      isRequiredBidingPrice: false,
      isRequiredExtraEquipment: false,
    };
  }

  // Save Activity Needs
  onSubmit({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;

    this.newNeed.id = this.generateId();
    this.newNeed.activityId = this.id;

    this.newNeed.isRequiredNotebookGuide = value.isRequiredNotebookGuide;
    this.newNeed.isRequiredGuideItems = value.isRequiredGuideItems;
    this.newNeed.detailedIGuideItems = this.detailedGuidingItems[
      value.detailedIGuideItems
    ];
    this.newNeed.isRequiredClothing = value.isRequiredClothing;
    this.newNeed.detailedClothing = this.detailedClothingItems[
      value.detailedClothing
    ];
    this.newNeed.isRequiredVehicles = value.isRequiredVehicles;

    this.newNeed.isRequiredOfficeEquipment = value.isRequiredOfficeEquipment;
    this.newNeed.isRequiredDepotEquipment = value.isRequiredDepotEquipment;
    this.newNeed.isRequiredFood = value.isRequiredFood;
    this.newNeed.foodOrderingForm = value.foodOrderingForm;
    this.newNeed.foodType = value.foodType;
    this.newNeed.foodDescription = this.foodDescription[value.foodDescription];

    this.newNeed.isRequiredTransportation = value.isRequiredTransportation;
    this.newNeed.isSitesAvailable = value.isSitesAvailable;
    this.newNeed.isSleepingArrangements = value.isSleepingArrangements;
    this.newNeed.isRequiredBidingPrice = value.isRequiredBidingPrice;
    this.newNeed.isRequiredBidingPrice = value.isRequiredBidingPrice;
    this.newNeed.isRequiredExtraEquipment = value.isRequiredExtraEquipment;
    this.newNeed.sleepingLocation = value.sleepingLocation;

    setTimeout(() => {
      try {
        this.needService.saveNeedToFireBase(this.newNeed);
        this.displayServerMessage('success', 'נשמר בהצלחה');
      } catch (error) {
        //console.log(error)
        this.displayServerMessage(
          'error',
          'משהו השתבש, השינויים החדשים לא נשמרו'
        );
      }
    }, 3000);
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.showSpinner = !this.showSpinner;
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }

  // Generated New Activity UUID
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
