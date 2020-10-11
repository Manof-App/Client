import { Component, OnInit, Input } from '@angular/core';
import { Assignment } from '../../../models/Assignment';
import { AssignmentsService } from '../../../services/assignments/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  SHARED_DATA: any;

  constructor(private assignmentsService: AssignmentsService) {}

  assignments: Assignment[];

  ngOnInit(): void {
    this.assignmentsService.currentData.subscribe(
      (data: any) => {
        // console.log(data);
        this.SHARED_DATA = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.handleAssignments();
  }

  handleAssignments() {
    // Convert An Object To Date
    this.assignments = [];
    let date = this.SHARED_DATA.startDate;

    const ASSIGN_1: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'מעבר על סיכומים משנה שעברה וכתיבת נגזרות',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_2: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'כתיבת מטרות המפעל - חיבור למטרות שנכתבו בדף הפתיחה של מנהל המפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_3: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'בניית שלד כח אדם - בעלי התפקידים במפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_4: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: " סגירת צוות מוביל מפעל (צוות מחלקה ע''פ רשימה)",
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_5: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: "סגירת כח אדם הדרכה (מד''בים או פרילנסרים)",
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_6: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: "סגירת כח אדם מנהלה (מד''בים או פרילנסרים)",
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_7: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'נוכחות בוגרים בהכנת בוגרים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    let dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_8: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'נוכחות בוגרים בהכנת מדריכים',
      finalExecDate: dateModified[dateModified.length - 7],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;
    dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_9: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'בוגרים במפעל - כולל חלוקת גרעינרים לישובים',
      finalExecDate: dateModified[dateModified.length - 7],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };

    const ASSIGN_10: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות מוביל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_11: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הכנת מנהל מפעל ורכז מפעלים בשטח',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_12: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות הדרכה - הכנה להכנת בוגרים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_13: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות מנהלה - הכנה להכנת בוגרים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_14: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות הדרכה - הכנה להכנת מדריכים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_15: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות הדרכה - הכנה למפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_16: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות מנהלה הכנה להכנת מדריכים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_17: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'ישיבת צוות מנהלה - הכנה למפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_18: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'בחירת מסלולים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_19: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הכנת פורמט חוברת הדרכה (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_20: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'בניית הדרכות לחוברת (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_21: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'שליחת חוברת להגהות (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_22: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הוצאת דף פרטים למד"בים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_23: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'קביעת זמן בישיבת מד"בים להסבר על הטיול',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_24: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הוצאת טיזר ראשוני',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;
    dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_25: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הוצאת פלייר',
      finalExecDate: dateModified[dateModified.length - 21],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_26: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'קביעת זמן בישיבת מד"בים להסבר על הטיול',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_27: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'קביעת מחיר על בסיס הערכת מחיר במערכת',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    const ASSIGN_28 = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'קביעת תאריך אחרון להרשמה',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    this.SHARED_DATA.startDate;

    const ASSIGN_29: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'פתיחת הרשמה למפעל (כרגע מיני פיי)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    this.SHARED_DATA.startDate;

    const ASSIGN_30: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'הוצאת תיאום טיולים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    this.SHARED_DATA.startDate;

    const ASSIGN_31: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'מעבר רכז מפעלים+מנהל מפעל על אישור טיול',
      finalExecDate: this.getDayWithinAMonth(date, 0),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    this.SHARED_DATA.startDate;

    const ASSIGN_32: Assignment = {
      relatedActivityId: this.SHARED_DATA.activityId,
      assignment: 'עדכון כמויות בסיום הרשמה',
      finalExecDate: this.getDayWithinAMonth(date, 0),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.SHARED_DATA.startDate;

    this.assignments.push(ASSIGN_1);
    this.assignments.push(ASSIGN_2);
    this.assignments.push(ASSIGN_3);
    this.assignments.push(ASSIGN_4);
    this.assignments.push(ASSIGN_5);
    this.assignments.push(ASSIGN_6);
    this.assignments.push(ASSIGN_7);
    this.assignments.push(ASSIGN_8);
    this.assignments.push(ASSIGN_9);
    this.assignments.push(ASSIGN_10);
    this.assignments.push(ASSIGN_11);
    this.assignments.push(ASSIGN_12);
    this.assignments.push(ASSIGN_13);
    this.assignments.push(ASSIGN_14);
    this.assignments.push(ASSIGN_15);
    this.assignments.push(ASSIGN_16);
    this.assignments.push(ASSIGN_17);
    this.assignments.push(ASSIGN_18);
    this.assignments.push(ASSIGN_19);
    this.assignments.push(ASSIGN_20);
    this.assignments.push(ASSIGN_21);
    this.assignments.push(ASSIGN_22);
    this.assignments.push(ASSIGN_23);
    this.assignments.push(ASSIGN_24);
    this.assignments.push(ASSIGN_25);
    this.assignments.push(ASSIGN_26);
    this.assignments.push(ASSIGN_27);
    this.assignments.push(ASSIGN_28);
    this.assignments.push(ASSIGN_29);
    this.assignments.push(ASSIGN_30);
    this.assignments.push(ASSIGN_31);
    this.assignments.push(ASSIGN_32);

    // Save to database
    this.assignmentsService.createAssignments(this.assignments).subscribe(
      (data: Assignment[]) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDaysInMonth(month, year) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getDayWithinAMonth(date: Date, monthsToExtract: number): Date {
    let daysDatesWithinMonth = this.getDaysInMonth(date.getMonth() - monthsToExtract, date.getFullYear());

    let day = daysDatesWithinMonth.length % 2 === 0 ? daysDatesWithinMonth.length / 2 : (daysDatesWithinMonth.length - 1) / 2;

    return daysDatesWithinMonth[day];
  }
}
