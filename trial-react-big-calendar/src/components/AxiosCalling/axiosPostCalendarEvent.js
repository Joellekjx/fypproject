import axios from 'axios';

export default function axiosGetFullData(taskCreatedDate, taskDueDate, taskType, taskStatus){
    axios.post('http://127.0.0.1:8000/api/task/', {
        // task_id: taskId,
        project_id: "1", //set default
        student_id: "2", //set default
        tutor_id: "1", //set default
        task_created_date: taskCreatedDate,
        task_due_date: taskDueDate,
        task_type: taskType,
        status: taskStatus,
    })
    .then(response=>{
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    })
}

