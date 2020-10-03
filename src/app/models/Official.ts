export interface Official {
  _id: string;
  relatedActivityId: string;
  job: string;
  jobTitle: string;
  requiredDate: Date;
  extraHoursNeeded: number;
  managerApproval: boolean;
  managerDepartmentApproval: boolean;
  notes: string;
}
