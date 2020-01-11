import { decorate, observable, action, computed } from "mobx"

class CalendarStore {
    newData = [];

    addData = (e) => {
        this.newData.push(e);
    }

    get getData() {
        return this.newData;
    }

    get getDataLength(){
        return this.newData.length;
    }
}

decorate(CalendarStore, {
    newData: observable,
    addData: action,
    getData: computed,
    getDataLength: computed,
})

export default CalendarStore;