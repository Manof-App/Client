import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { Official } from '../../../../models/Official';
import { ActivityEditing } from '../../../../models/ActivityEditing';

import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { OfficialsService } from '.././../../../services/officials/officials.service';
import { ActivitiesService } from '../../../../services/activities/activities.service';

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

  isMobile = false;
  showConfirmBox = false;

  id: string;
  content = 'האם אתה בטוח שאתה רוצה למחוק?';

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

  editable: ActivityEditing = {
    isEditAndCreate: false,
    isOnlyEdit: false,
  };

  // End Of Variables Declarations

  // Constructor
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private officialService: OfficialsService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRefs: ChangeDetectorRef,
    private activitiesService: ActivitiesService
  ) {
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((result) => {
      this.isMobile = result.matches;
      this.initDialogSettings();
    });
  }

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(null);
    this.id = this.route.snapshot.queryParams.id;

    this.editable.isOnlyEdit = true;
    this.activitiesService.setEditingStates(this.editable);

    this.refreshTable();
  }

  // Variables Initialization
  initDialogSettings() {
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
  }

  // Refresh table data
  refreshTable() {
    this.officialService.getOfficials(this.id).subscribe(
      (data: Official[]) => {
        console.log(data);
        this.officials = data;
        this.dataSource = new MatTableDataSource(this.officials);
      },
      (error) => {
        console.log(error);
      }
    );
    this.changeDetectorRefs.detectChanges();
  }

  // Triggered when the plus button is pressed
  createOfficial() {
    this.dialogConfig.data = null;
    this.dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);
    this.dialogRef.afterClosed().subscribe(
      (obj: any) => {
        if (obj.event === 'save') {
          this.official = obj.data;
          this.addOfficialToDB();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Add new official to database
  addOfficialToDB() {
    this.officialService.writeOfficial(this.official).subscribe(
      (data: Official) => {
        console.log(data);
        this.refreshTable();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Update official in database
  updateOfficial() {
    this.officialService.updateOfficial(this.official).subscribe(
      (data: Official) => {
        console.log(data);
        this.refreshTable();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Triggered when the edit button is pressed
  editOfficial(element) {
    this.dialogConfig.data = element;
    this.dialogRef = this.dialog.open(DialogComponent, this.dialogConfig);

    this.dialogRef.afterClosed().subscribe((obj) => {
      if (obj.event === 'edit') {
        this.official = obj.data;
        this.updateOfficial();
        this.refreshTable();
      }
    });
  }

  // Handle Row Removing
  deleteOfficial(element) {
    this.showConfirmBox = !this.showConfirmBox;
    this.official = element;
  }

  // Handle Confirm Box Dialog User Answer
  handleUserAnswer(userAnswer) {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      this.officialService.deleteOfficial(this.official).subscribe(
        (data: void) => {
          console.log(data);
          this.showConfirmBox = !this.showConfirmBox;
          this.refreshTable();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onMoveTab() {
    this.tabNumber = 3;
    this.triggerTab.emit(this.tabNumber);
  }
}
