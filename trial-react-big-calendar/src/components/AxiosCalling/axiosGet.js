import axios from 'axios';

export default function axiosGet(calendarStore){
    axios.get('http://127.0.0.1:8000/api/task/')
        .then(res => {
            res.data.map(indivRes => {
                console.log(indivRes);
                console.log("inside axios get");
                var start = new Date(indivRes.task_due_date);
                var starttime = new Date(start.setHours(0, 0, 0, 0));
                var endtime = new Date(indivRes.task_due_date);
                calendarStore.addData({
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

