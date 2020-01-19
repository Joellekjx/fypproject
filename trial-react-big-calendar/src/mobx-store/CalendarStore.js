import { decorate, observable, action, computed } from "mobx"

class CalendarStore {
    newData = [];
    selectedData = []; //for moving between maincalendar to say weekly report
    //this is a SPECIFIC onClick event

    addData = (e) => {
        this.newData.push(e);
    }

    addSelectedData = (e) => {
        this.selectedData.push(e);
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