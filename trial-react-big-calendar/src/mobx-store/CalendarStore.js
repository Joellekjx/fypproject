import { decorate, observable, action, computed, remove } from "mobx"
import { isThisSecond } from "date-fns";

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

//If you are a staff, your calendarStore's data will include ALL your student's data
//If you are a student, your calendarStore ONLY includes YOUR OWN data

class CalendarStore {
    newData = [];
    selectedData = {}; //for moving between maincalendar to say weekly report
    //this is a SPECIFIC onClick event
    defaultState = { state: 'Weekly Report', index: 0 } //available as: 'Weekly Report', 'Meetings', 'Other Submissions'
    totalHoursSpent = "0";
    testFileURL = "";
    userData = '';
    staffStudentData = []; //original bucket
    staffStudentFilteredData = []; //filtered bucket ==> is the bucket that'll display on calendar page for staff
    checkboxes = [];

    addData = (e) => {
        this.newData.push(e);
        this.staffStudentFilteredData.push(e)
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

    setFileURL = (fileURL) => {
        this.testFileURL = fileURL;
    }

    setUserData = (userData) => {
        console.log(userData)
        console.log("can i receive this in the store??")
        this.userData = userData;
    }

    addStaffStudentData = (data) => {
        this.staffStudentData.push(data)
        this.staffStudentFilteredData.push(data) //fill the filtered array with the same events as original upon calling for axios
    }

    filterStaffStudentData = (removedOption) => { //think about what to do in here lol
        removedOption = parseInt(removedOption)
        this.staffStudentFilteredData.filter(item => {
            if (item.project_id !== removedOption) {
                console.log(item)
                console.log("is this even correct lol")
                return item
            }
        })
    }

    //Actually, checkboxes might be changed to contain everything inside /api/usersAndProjects instead heh
    setCheckboxes = (obj) => {
        //Obj = { name - project_name, key - project_id, label - project_name, color }
        this.checkboxes.push(obj)
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

    get getFileURL() {
        return this.testFileURL;
    }

    get getUserData() {
        return this.userData;
    }

    get getStaffStudentData() {
        return this.staffStudentData;
    }

    get getStaffStudentFilteredData() {
        return this.staffStudentFilteredData;
    }

    get getStaffStudentFilteredDataLength() {
        return this.staffStudentFilteredData.length;
    }

    get getCheckboxes() {
        return this.checkboxes;
    }
}

decorate(CalendarStore, {
    newData: observable,
    selectedData: observable,
    defaultState: observable,
    totalHoursSpent: observable,
    testFileURL: observable,
    userData: observable,
    staffStudentData: observable,
    staffStudentFilteredData: observable,
    checkboxes: observable,
    addData: action,
    addSelectedData: action,
    changeDefaultState: action,
    setTotalHoursSpent: action,
    deleteSelectedEvent: action,
    setFileURL: action,
    setUserData: action,
    addStaffStudentData: action,
    filterStaffStudentData: action,
    setCheckboxes: action,
    getData: computed,
    getSelectedData: computed,
    getDataLength: computed,
    getDefaultState: computed,
    getTotalHoursSpent: computed,
    getFileURL: computed,
    getUserData: computed,
    getStaffStudentData: computed,
    getStaffStudentFilteredData: computed,
    getStaffStudentFilteredDataLength: computed,
    getCheckboxes: computed,
})

export default CalendarStore;