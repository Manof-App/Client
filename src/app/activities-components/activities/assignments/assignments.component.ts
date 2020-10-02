import { Component, OnInit, Input } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { ActivityAssignments } from '../../../models/ActivityAssignments';
import { AssignmentsService } from '../../../services/assignments/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  SHARED_DATA: any;

  constructor(private assignmentsService: AssignmentsService) {}

  assignments: ActivityAssignments;
  ngOnInit(): void {
    this.assignmentsService.currentData.subscribe(
      (data) => (this.SHARED_DATA = data)
    );
    //console.log(this.SHARED_DATA);
    this.handleAssignments();
  }

  handleAssignments() {
    // Convert An Object To Date
    let date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_1 = {
      assignment: 'מעבר על סיכומים משנה שעברה וכתיבת נגזרות',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_2 = {
      assignment:
        'כתיבת מטרות המפעל - חיבור למטרות שנכתבו בדף הפתיחה של מנהל המפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_3 = {
      assignment: 'בניית שלד כח אדם - בעלי התפקידים במפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_4 = {
      assignment: " סגירת צוות מוביל מפעל (צוות מחלקה ע''פ רשימה)",
      finalExecDate: new Date(date.setMonth(date.getMonth() - 2)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_5 = {
      assignment: "סגירת כח אדם הדרכה (מד''בים או פרילנסרים)",
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_6 = {
      assignment: "סגירת כח אדם מנהלה (מד''בים או פרילנסרים)",
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_7 = {
      assignment: 'נוכחות בוגרים בהכנת בוגרים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    let dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_8 = {
      assignment: 'נוכחות בוגרים בהכנת מדריכים',
      finalExecDate: dateModified[dateModified.length - 7],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);
    dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_9 = {
      assignment: 'בוגרים במפעל - כולל חלוקת גרעינרים לישובים',
      finalExecDate: dateModified[dateModified.length - 7],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };

    const ASSIGN_10 = {
      assignment: 'ישיבת צוות מוביל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_11 = {
      assignment: 'הכנת מנהל מפעל ורכז מפעלים בשטח',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_12 = {
      assignment: 'ישיבת צוות הדרכה - הכנה להכנת בוגרים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_13 = {
      assignment: 'ישיבת צוות מנהלה - הכנה להכנת בוגרים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_14 = {
      assignment: 'ישיבת צוות הדרכה - הכנה להכנת מדריכים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_15 = {
      assignment: 'ישיבת צוות הדרכה - הכנה למפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_16 = {
      assignment: 'ישיבת צוות מנהלה הכנה להכנת מדריכים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_17 = {
      assignment: 'ישיבת צוות מנהלה - הכנה למפעל',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_18 = {
      assignment: 'בחירת מסלולים',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_19 = {
      assignment:
        'הכנת פורמט חוברת הדרכה (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_20 = {
      assignment:
        'בניית הדרכות לחוברת (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_21 = {
      assignment:
        'שליחת חוברת להגהות (אם יש צורך בחוברות - ע"פ מילוי צרכים של מנהל מפעל)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_22 = {
      assignment: 'הוצאת דף פרטים למד"בים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_23 = {
      assignment: 'קביעת זמן בישיבת מד"בים להסבר על הטיול',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_24 = {
      assignment: 'הוצאת טיזר ראשוני',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);
    dateModified = this.getDaysInMonth(date.getMonth(), date.getFullYear());

    const ASSIGN_25 = {
      assignment: 'הוצאת פלייר',
      finalExecDate: dateModified[dateModified.length - 21],
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_26 = {
      assignment: 'קביעת זמן בישיבת מד"בים להסבר על הטיול',
      finalExecDate: this.getDayWithinAMonth(date, 1),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_27 = {
      assignment: 'קביעת מחיר על בסיס הערכת מחיר במערכת',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_28 = {
      assignment: 'קביעת תאריך אחרון להרשמה',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_29 = {
      assignment: 'פתיחת הרשמה למפעל (כרגע מיני פיי)',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_30 = {
      assignment: 'הוצאת תיאום טיולים',
      finalExecDate: new Date(date.setMonth(date.getMonth() - 1)),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_31 = {
      assignment: 'מעבר רכז מפעלים+מנהל מפעל על אישור טיול',
      finalExecDate: this.getDayWithinAMonth(date, 0),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    const ASSIGN_32 = {
      assignment: 'עדכון כמויות בסיום הרשמה',
      finalExecDate: this.getDayWithinAMonth(date, 0),
      scheduleDate: new Date(),
      progress: 'טרם הסתיים',
    };
    date = this.convertObjectToDate(this.SHARED_DATA.startDate);

    this.assignments = {
      data: [ASSIGN_1],
    };

    this.assignments.data.push(ASSIGN_2);
    this.assignments.data.push(ASSIGN_3);
    this.assignments.data.push(ASSIGN_4);
    this.assignments.data.push(ASSIGN_5);
    this.assignments.data.push(ASSIGN_6);
    this.assignments.data.push(ASSIGN_7);
    this.assignments.data.push(ASSIGN_8);
    this.assignments.data.push(ASSIGN_9);
    this.assignments.data.push(ASSIGN_10);
    this.assignments.data.push(ASSIGN_11);
    this.assignments.data.push(ASSIGN_12);
    this.assignments.data.push(ASSIGN_13);
    this.assignments.data.push(ASSIGN_14);
    this.assignments.data.push(ASSIGN_15);
    this.assignments.data.push(ASSIGN_16);
    this.assignments.data.push(ASSIGN_17);
    this.assignments.data.push(ASSIGN_18);
    this.assignments.data.push(ASSIGN_19);
    this.assignments.data.push(ASSIGN_20);
    this.assignments.data.push(ASSIGN_21);
    this.assignments.data.push(ASSIGN_22);
    this.assignments.data.push(ASSIGN_23);
    this.assignments.data.push(ASSIGN_24);
    this.assignments.data.push(ASSIGN_25);
    this.assignments.data.push(ASSIGN_26);
    this.assignments.data.push(ASSIGN_27);
    this.assignments.data.push(ASSIGN_28);
    this.assignments.data.push(ASSIGN_29);
    this.assignments.data.push(ASSIGN_30);
    this.assignments.data.push(ASSIGN_31);
    this.assignments.data.push(ASSIGN_32);

    this.convertDateToObject();

    // Save Assignments To Firebase
    this.assignmentsService.saveAssignmentsToFireBase(
      this.SHARED_DATA.activityId,
      this.assignments
    );
  }

  convertDateToObject() {
    this.assignments.data.forEach((obj) => {
      this.toObjectMap(obj.finalExecDate);
    });
  }

  toObjectMap = (date: Date): Object => {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  };

  convertObjectToDate = (dateObject: any) => {
    return new Date(
      dateObject.year + '/' + dateObject.month + '/' + dateObject.day
    );
  };

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
    let daysDatesWithinMonth = this.getDaysInMonth(
      date.getMonth() - monthsToExtract,
      date.getFullYear()
    );

    let day =
      daysDatesWithinMonth.length % 2 === 0
        ? daysDatesWithinMonth.length / 2
        : (daysDatesWithinMonth.length - 1) / 2;

    return daysDatesWithinMonth[day];
  }
}
