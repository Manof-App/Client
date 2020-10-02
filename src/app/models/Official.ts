export interface Official {
  activityOfficials: [
    {
      id: string;
      activityId: string;
      job: string;
      jobTitle: string;
      requiredDate: Date;
      extraHoursNeeded: number;
      managerApproval: boolean;
      managerDepartmentApproval: boolean;
      notes: string;
    }
  ];
}
