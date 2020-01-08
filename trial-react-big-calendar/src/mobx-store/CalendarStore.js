import { decorate, observable, action, computed } from "mobx"

class CalendarStore {
    newData = [];

    addData = (e) => {
        this.newData.push(e);
    }

    get getData() {
        return this.newData;
    }
}

decorate(CalendarStore, {
    newData: observable,
    addData: action,
    getData: computed,
})

export default CalendarStore;