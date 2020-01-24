import { decorate, observable, action, computed } from "mobx"

class CalendarStore {
    newData = [];
    selectedData = {
        Id: '',
        title: '',
        start: '',
        end: '',
        event_type: '',
        status: '',
    }; //for moving between maincalendar to say weekly report
    //this is a SPECIFIC onClick event
    defaultState = 'Weekly Report' //available as: 'Weekly Report', 'Meetings', 'Other Submissions'
    weeklyReportData = [];

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
}

decorate(CalendarStore, {
    newData: observable,
    selectedData: observable,
    defaultState: observable,
    weeklyReportData: observable,
    addData: action,
    addSelectedData: action,
    changeDefaultState: action,
    addWeeklyReportData: action,
    getData: computed,
    getSelectedData: computed,
    getDataLength: computed,
    getDefaultState: computed,
    getWeeklyReportData: computed
})

export default CalendarStore;