import axios from 'axios';

export default function axiosGetFullData(calendarStore){
    var totalHours = 0;
    axios.get('http://127.0.0.1:8000/api/task/')
        .then(res => {
            res.data.map(indivRes => {
                var start = new Date(indivRes.task_due_date);
                var starttime = new Date(start.setHours(0, 0, 0, 0));
                var endtime = new Date(indivRes.task_due_date);
                totalHours += indivRes.hours_spent
                calendarStore.addData({
                Id: indivRes.task_id, 
                title: indivRes.task_type, 
                start: starttime, 
                end: endtime, 
                event_type: indivRes.task_type,
                status: indivRes.status,
                content: indivRes.content,
                hours_spent: indivRes.hours_spent,
                submission_date: indivRes.submission_date
                })
            })
            if(calendarStore.getTotalHoursSpent === "0"){
                calendarStore.setTotalHoursSpent(totalHours);
            }
        })
}

