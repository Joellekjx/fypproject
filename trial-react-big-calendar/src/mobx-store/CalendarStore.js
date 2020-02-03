import { decorate, observable, action, computed } from "mobx"

class CalendarStore {
    newData = [];
    selectedData = {}; //for moving between maincalendar to say weekly report
    //this is a SPECIFIC onClick event
    defaultState = 'Weekly Report' //available as: 'Weekly Report', 'Meetings', 'Other Submissions'
    weeklyReportData = [];
    totalHoursSpent = "";

    addData = (e) => {
        this.newData.push(e);
    }

    addSelectedData = ({Id, title, start, end, event_type, status}) => {
        this.selectedData.Id = Id;
        this.selectedData.title = title;
        this.selectedData.start = start;
        this.selectedData.end = end;
        this.selectedData.event_type = event_type;
        this.selectedData.status = status;
    }

    addWeeklyReportData = (e) => {
        this.weeklyReportData.push(e);
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

    get getDataLength(){
        return this.newData.length;
    }

    get getDefaultState(){
        return this.defaultState;
    }

    get getWeeklyReportData(){
        return this.weeklyReportData;
    }

    get getTotalHoursSpent(){
        return this.totalHoursSpent;
    }
}

decorate(CalendarStore, {
    newData: observable,
    selectedData: observable,
    defaultState: observable,
    weeklyReportData: observable,
    totalHoursSpent: observable,
    addData: action,
    addSelectedData: action,
    changeDefaultState: action,
    addWeeklyReportData: action,
    setTotalHoursSpent: action,
    getData: computed,
    getSelectedData: computed,
    getDataLength: computed,
    getDefaultState: computed,
    getWeeklyReportData: computed,
    getTotalHoursSpent: computed,
})

export default CalendarStore;