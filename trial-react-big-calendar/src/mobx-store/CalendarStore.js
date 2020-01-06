import { decorate, observable, action, computed } from "mobx"
import moment from "moment";
import axios from 'axios';

class CalendarStore {
    constructor() {
        this.newData = []
    }

    setNewData = (data) => {
        // this.newData.Id = id;
        // this.newData.title = title;
        // this.newData.start = starttime;
        // this.newData.end = endtime;
        // this.newData.event_type = eventtype;
        this.newData = [...data];
        console.log(this.newData);
        console.log("inside set new data");
    }

    getApiData(){
        axios.get('http://127.0.0.1:8000/api/task/')
            .then(res => {
                this.setNewData(res.data);
                console.log(res.data);
            });
    }

    get getAllData(){
        return this.newData;
    }
    // get getAllNewData() {
    //     return this.newData;
    // }

    // get getIdOnly(){
    //     return this.newData.Id;
    // }

    // get getTitleOnly(){
    //     return this.newData.title;
    // }

    // get getStartTimeOnly(){
    //     return this.newData.start;
    // }

    // get getEndTimeOnly(){
    //     return this.newData.end;
    // }

    // get getEventTypeOnly(){
    //     return this.newData.event_type;
    // }
}

decorate(CalendarStore, {
    // Id: observable,
    // title: observable,
    // start: observable,
    // end: observable,
    // event_type: observable,
    newData: observable,
    setNewData: action,
    getAllData: computed,
    // getAllNewData: computed,
    // getEndTimeOnly: computed,
    // getEventTypeOnly: computed,
    // getIdOnly: computed,
    // getStartTimeOnly: computed,
    // getTitleOnly: computed,
    getApiData: action,
})

export default CalendarStore;