export interface Need {
  _id?: string;
  relatedActivityId?: string;
  isRequiredNotebookGuide?: boolean;
  isRequiredGuideItems?: boolean;
  detailedIGuideItems?: string;
  isRequiredClothing?: boolean;
  detailedClothing?: string;
  isRequiredVehicles?: boolean;
  isRequiredOfficeEquipment?: boolean;
  isRequiredDepotEquipment?: boolean;
  isRequiredFood?: boolean;
  foodOrderingForm?: boolean;
  foodType?: boolean;
  foodDescription?: string;
  isRequiredTransportation?: boolean;
  isSitesAvailable?: boolean;
  isSleepingArrangements?: boolean;
  sleepingLocation?: string;
  isRequiredBidingPrice?: boolean;
  isRequiredExtraEquipment?: boolean;
}
