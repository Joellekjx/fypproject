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

    get getData() {
        return this.newData;
    }

    get getSelectedData() {
        return this.selectedData;
    }

    get getDataLength(){
        return this.newData.length;
    }
}

decorate(CalendarStore, {
    newData: observable,
    selectedData: observable,
    addData: action,
    addSelectedData: action,
    getData: computed,
    getSelectedData: computed,
    getDataLength: computed,
})

export default CalendarStore;