import axios from 'axios';

/*
* Obviously if you can sort the data (axiosGetFullData) INSTEAD of storing again into store
* Would be the best alternative
* So for now we shall use this cheap method lol
*/

export default function axiosGetWeeklyReport(calendarStore){
    axios.get('http://127.0.0.1:8000/api/task/?task_type=weekly report')
        .then(res => {
            res.data.map(indivRes => {
                var start = new Date(indivRes.task_due_date);
                var starttime = new Date(start.setHours(0, 0, 0, 0));
                var endtime = new Date(indivRes.task_due_date);
                calendarStore.addWeeklyReportData({
                Id: indivRes.task_id, 
                title: indivRes.task_type, 
                start: starttime, 
                end: endtime, 
                event_type: indivRes.task_type,
                status: indivRes.status
                })
            })
        })
}

