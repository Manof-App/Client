import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Need } from '../../../../models/Need';
import { Router, ActivatedRoute } from '@angular/router';
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
  need: Need;
  isEdit: boolean;
  message: string;

  responseType: string;
  showSpinner: boolean;
  showServerMessage: boolean;
  actionComplete: boolean;

  foodDescription: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק', 'אין פרטים'];
  detailedGuidingItems: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק',  'אין פרטים'];
  detailedClothingItems: string[] = ['עומר לובקו', 'תומר גבעתי', 'צח ברק',  'אין פרטים'];

  // End Of Variables Declarations

  // Constructor
  constructor(private formBuilder: FormBuilder, private needService: NeedService, private route: ActivatedRoute, private router: Router) {}

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    this.actionComplete = this.showSpinner = this.isEdit = false;

   
    this.initForms();
    this.initObject();

    this.needService.getNeed(this.id).subscribe(
      (data: Need) => {
        if (data !== undefined) {
          this.needForm.controls.isRequiredNotebookGuide.setValue(data.isRequiredNotebookGuide.toString());
          this.needForm.controls.isRequiredGuideItems.setValue(data.isRequiredGuideItems.toString());
          this.needForm.controls.isRequiredClothing.setValue(data.isRequiredClothing.toString());
          this.needForm.controls.isRequiredVehicles.setValue(data.isRequiredVehicles.toString());
          this.needForm.controls.isRequiredOfficeEquipment.setValue(data.isRequiredOfficeEquipment.toString());
          this.needForm.controls.isRequiredDepotEquipment.setValue(data.isRequiredDepotEquipment.toString());
          this.needForm.controls.isRequiredFood.setValue(data.isRequiredFood.toString());
          this.needForm.controls.isRequiredTransportation.setValue(data.isRequiredTransportation.toString());
          this.needForm.controls.foodOrderingForm.setValue(data.foodOrderingForm.toString());
          this.needForm.controls.isRequiredBidingPrice.setValue(data.isRequiredBidingPrice.toString());
          this.needForm.controls.isRequiredExtraEquipment.setValue(data.isRequiredExtraEquipment.toString());
          this.needForm.controls.isSleepingArrangements.setValue(data.isSleepingArrangements.toString());
          this.needForm.controls.foodType.setValue(data.foodType.toString());

          this.needForm.controls.detailedIGuideItems
          .setValue(this.detailedGuidingItems.findIndex((val) => val === data.detailedIGuideItems));

          this.needForm.controls.foodDescription.setValue(this.foodDescription.findIndex((val) => val === data.foodDescription));
          this.needForm.controls.detailedClothing.setValue(this.detailedClothingItems.findIndex((val) => val === data.detailedClothing));
          this.needForm.controls.isSitesAvailable.setValue(data.isSitesAvailable.toString());
          this.needForm.controls.sleepingLocation.setValue(data.sleepingLocation);
          this.isEdit = true;
        }
      },
      (error) => {
        // console.log(error);
      }
    );
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
      foodOrderingForm: [false],
      foodType: [false],
      foodDescription: [''],
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
    this.need = {
      relatedActivityId: '',
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

    setTimeout(() => {
      this.need.relatedActivityId = this.id;

      this.need.isRequiredNotebookGuide = value.isRequiredNotebookGuide;
      this.need.isRequiredGuideItems = value.isRequiredGuideItems;
      this.need.detailedIGuideItems = this.utilityFunction(this.detailedGuidingItems[value.detailedIGuideItems]);
      this.need.isRequiredClothing = value.isRequiredClothing;

      this.need.detailedClothing = this.utilityFunction(this.detailedClothingItems[value.detailedClothing]);
      this.need.isRequiredVehicles = value.isRequiredVehicles;

      this.need.isRequiredOfficeEquipment = value.isRequiredOfficeEquipment;
      this.need.isRequiredDepotEquipment = value.isRequiredDepotEquipment;
      this.need.isRequiredFood = value.isRequiredFood;
      this.need.foodOrderingForm = value.foodOrderingForm;
      this.need.foodType = value.foodType;

      this.need.foodDescription = this.utilityFunction(this.foodDescription[value.foodDescription]);

      this.need.isRequiredTransportation = value.isRequiredTransportation;
      this.need.isSitesAvailable = value.isSitesAvailable;
      this.need.isSleepingArrangements = value.isSleepingArrangements;
      this.need.isRequiredBidingPrice = value.isRequiredBidingPrice;
      this.need.isRequiredBidingPrice = value.isRequiredBidingPrice;
      this.need.isRequiredExtraEquipment = value.isRequiredExtraEquipment;
      this.need.sleepingLocation = value.sleepingLocation;

      console.log('check');
      console.log(this.isEdit);

      if (!this.isEdit) {
        console.log(this.need);
        this.needService.createNeed(this.need).subscribe(
          (data: Need) => {
            console.log(data);
            this.displayServerMessage('success', 'נשמר בהצלחה');
          },
          (error) => {
            // console.log(error)
            this.displayServerMessage('error', 'משהו השתבש, השינויים לא נשמרו');
          }
        );
      } else {
        this.needService.updateNeed(this.need).subscribe(
          (data: Need) => {
            console.log(data);
            this.displayServerMessage('success', 'נשמר בהצלחה');
          },
          (error) => {
            // console.log(error)
            this.displayServerMessage('error', 'משהו השתבש, השינויים לא נשמרו');
          }
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

  utilityFunction(value: any) {
    return value === undefined ? 'אין פרטים' : value;
  }
}

