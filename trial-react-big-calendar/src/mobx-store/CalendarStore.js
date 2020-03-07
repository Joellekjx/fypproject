import { decorate, observable, action, computed } from "mobx"

/**
 * Format of newData:
 *  Id: indivRes.task_id, 
    title: indivRes.task_type, 
    start: starttime, 
    end: endtime, 
    event_type: indivRes.task_type,
    status: indivRes.status,
    content: indivRes.content,
    hours_spent: indivRes.hours_spent,
    submission_date: indivRes.submission_date,
    project_id: indivRes.project_id,
    student_id: indivRes.student_id,
    tutor_id: indivRes.tutor_id,
    comments: indivRes.comments,
    documents: indivRes.documents
 */

class CalendarStore {
    newData = [];
    selectedData = {}; //for moving between maincalendar to say weekly report
    //this is a SPECIFIC onClick event
    defaultState = { state: 'Meetings', index: 1 } //available as: 'Weekly Report', 'Meetings', 'Other Submissions'
    totalHoursSpent = "0";

    addData = (e) => {
        this.newData.push(e);
    }

    addSelectedData = ({ Id, title, start, end, event_type, status }) => {
        this.selectedData.Id = Id;
        this.selectedData.title = title;
        this.selectedData.start = start;
        this.selectedData.end = end;
        this.selectedData.event_type = event_type;
        this.selectedData.status = status;
    }

    updateWeeklyReportSubmission = (index, status, content, submission_date, hours_spent) => {
        var found = this.newData.find(function (element) {
            return element.Id === index;
        });

        found.status = status;
        found.content = content;
        found.submission_date = submission_date;
        found.hours_spent = hours_spent;
    }

    deleteSelectedEvent = (id) => {
        var filterEvent = this.newData.filter(function (el) { return el.Id !== id; });
        this.newData = filterEvent
    }

    changeDefaultState = (e) => {
        this.defaultState = e;
    }

    setTotalHoursSpent = (hours) => {
        this.totalHoursSpent = hours;
    }

    get getData() {
        return this.newData;
    }

    get getSelectedData() {
        return this.selectedData;
    }

    get getDataLength() {
        return this.newData.length;
    }

    get getDefaultState() {
        return this.defaultState;
    }

    get getTotalHoursSpent() {
        return this.totalHoursSpent;
    }
}

decorate(CalendarStore, {
    newData: observable,
    selectedData: observable,
    defaultState: observable,
    totalHoursSpent: observable,
    addData: action,
    addSelectedData: action,
    changeDefaultState: action,
    setTotalHoursSpent: action,
    deleteSelectedEvent: action,
    getData: computed,
    getSelectedData: computed,
    getDataLength: computed,
    getDefaultState: computed,
    getTotalHoursSpent: computed,
})

export default CalendarStore;