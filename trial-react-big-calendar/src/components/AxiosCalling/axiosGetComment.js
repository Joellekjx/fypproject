import axios from 'axios';

export default function axiosGetComment(calendarStore){
    // var totalHours = 0;
    axios.get('http://127.0.0.1:8000/api/comment/')
        .then(res => {
            console.log(res.data);
            // res.data.map(indivRes => {
            //     console.log(indivRes);
                // var start = new Date(indivRes.task_due_date);
                // var starttime = new Date(start.setHours(0, 0, 0, 0));
                // var endtime = new Date(indivRes.task_due_date);
                // totalHours += indivRes.hours_spent
                // calendarStore.addData({
                //     task_title: indivRes.task,
                //     user: indivRes.user,
                //     comment_date: indivRes.date,
                //     comment_time: indivRes.time,
                //     comment_content: indivRes.content
                // })
            // })
            // if(calendarStore.getTotalHoursSpent === "0"){
            //     calendarStore.setTotalHoursSpent(totalHours);
            // }
        })
        .catch(error=> {
            console.log(error.response);
        })
}

