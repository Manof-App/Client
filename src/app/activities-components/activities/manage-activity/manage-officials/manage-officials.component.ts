import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { Official } from '../../../../models/Official';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { OfficialsService } from '.././../../../services/officials/officials.service';

@Component({
  selector: 'app-manage-officials',
  templateUrl: './manage-officials.component.html',
  styleUrls: ['./manage-officials.component.css'],
})
export class ManageOfficialsComponent implements OnInit {
  // Variables Declarations - Do Not Modified!
  dialogConfig: MatDialogConfig;
  dataSource = new MatTableDataSource();
  public dialogRef: MatDialogRef<DialogComponent>;

  userData: any;
  official: Official;
  officials: Official[];

  isMobile: boolean = false;
  showConfirmBox: boolean = false;

  id: string;
  content: string = 'האם אתה בטוח שאתה רוצה למחוק?';

  displayedColumns: string[] = [
    'index',
    'job',
    'jobTitle',
    'requiredDate',
    'extraHoursNeeded',
    'managerApproval',
    'managerDepartmentApproval',
    'notes',
    'options',
  ];
  @Input() tabNumber: number;
  @Output() triggerTab = new EventEmitter<any>();

  // End Of Variables Declarations

  // Constructor
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private officialService: OfficialsService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.initDialogSettings();
      });
  }

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(null);
    this.id = this.route.snapshot.queryParams.id;
    this.refreshTable();
  }

  // Variables Initialization
  initDialogSettings = () => {
    if (!this.dialogConfig) {
      this.dialogConfig = new MatDialogConfig();
      this.dialogConfig.disableClose = true;
      this.dialogConfig.autoFocus = true;
    }

    if (this.isMobile) {
      this.dialogConfig.width = '100%';
      this.dialogConfig.height = '80%';
    } else {
      this.dialogConfig.width = '60%';
    }
  };

  //Add A New Official To Firestore
  addNewOfficial = (official) => {
    official.relatedActivityId = this.id;

    if (!this.official) {
      this.official = {
        _id: official.data.id,
        relatedActivityId: official.data.activityId,
        job: official.data.job,
        jobTitle: official.data.jobTitle,
        requiredDate: official.data.requiredDate,
        extraHoursNeeded: official.data.extraHoursNeeded,
        managerApproval: official.data.managerApproval,
        managerDepartmentApproval: official.data.managerDepartmentApproval,
        notes: official.data.notes,
      };
    } else {
      this.officials.push(official);
    }
    //this.aos.saveOfficialToFireStore(this.official._id);
    this.refreshTable();
  };

  // Update A Specific Official To Firestore
  updateOfficial = () => {
    //this.aos.saveOfficialToFireStore(this.official, this.activityId);
    this.refreshTable();
    this.dialogConfig.data = null;
  };

  // Refresh table data
  refreshTable = () => {
    this.officialService.getOfficials(this.id).subscribe(
      (officials: Official[]) => {
        this.officials = officials;
        this.dataSource = new MatTableDataSource();
      },
      (error) => {
        console.log(error);
      }
    );
    this.changeDetectorRefs.detectChanges();
  };

  // Triggered When The Plus Button Is Being Pressed
  createOfficial() {
    this.dialogConfig.data = null;
    this.dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
    this.dialogRef.afterClosed().subscribe(
      (official) => {
        if (official.event === 'save') {
          this.addNewOfficial(official);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Triggered When The Edit Button Is Being Pressed
  onEdit = (rowData) => {
    this.dialogConfig.data = rowData;
    this.dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);

    this.dialogRef.afterClosed().subscribe((official) => {
      if (official.event === 'edit') {
        this.editLocalOfficialList(official);
      }
    });
  };

  editLocalOfficialList = (currOfficial) => {
    const currId = currOfficial.data.id;
    this.officials.forEach((official, index) => {
      if (official._id === currId) {
        this.official[index] = currOfficial.data;
        this.updateOfficial();
      }
    });
  };

  // Handle Row Removing
  onDelete = (rowData) => {
    this.showConfirmBox = !this.showConfirmBox;
    this.userData = rowData;
  };

  // Handle Confirm Box Dialog User Answer
  handleUserAnswer = (userAnswer) => {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      const currId = this.userData.id;
      this.officials.forEach((official, index) => {
        if (official._id === currId) {
          this.officials.splice(index, 1);
          this.updateOfficial();
        }
      });
      this.showConfirmBox = !this.showConfirmBox;
    }
  };

  onMoveTab() {
    this.tabNumber = 3;
    this.triggerTab.emit(this.tabNumber);
  }
}
