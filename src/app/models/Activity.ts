import { Location } from './Location';

export interface Activity {
  _id?: string;
  activityName?: string;
  manager?: string;
  startDate?: Date;
  endDate?: Date;
  targetedStudents?: string;
  targetedGuides?: string;
  crewPreparationDate?: Date;
  type?: string;
  preparationsDate?: Date;
  targetAudienceDetails?: string;
  summarizeDate?: Date;
  isScheduled?: boolean;
  mapLocation?: Location;
  isApproved?: boolean;
  status?: string;
  percentage?: number;
}
