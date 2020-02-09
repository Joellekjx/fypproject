import axios from 'axios';

export default function axiosGetComments(calendarStore){
    // var totalHours = 0;
    axios.get('http://127.0.0.1:8000/api/comment/')
        .then(res => {
            // console.log(res.data);
            res.data.map(indivRes => {
                calendarStore.addComments({
                    comment_id: indivRes.comment_id,
                    event_type: "Weekly Report Comment",
                    Id: indivRes.task_id,
                    user_id: indivRes.user_id,
                    content: indivRes.content,
                    creation_date: indivRes.creation_date
                })
            })
        })
        .catch(error=> {
            console.log(error.response);
        })
}

