import axios from 'axios';

//axios post creates a new task
export default function axiosPostComment(task_id, user_id, commentContent, creation_date){
    axios.post('http://127.0.0.1:8000/api/comment/', {
        user_id: "2",
        task_id: task_id,
        content: commentContent,
        creation_date: creation_date,
    })
    .then(response => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    })
}

