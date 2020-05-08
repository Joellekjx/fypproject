import axios from 'axios';

//axios post creates a new task
/**
 * For axiosPost, if "weekly report", taskCreatedDate === taskDueDate
 * Else if "meetings", taskCreatedDate = start timing of meeting and end timing
 */
export default function axiosPost(project_id, student_id, taskCreatedDate, taskDueDate, taskType, taskStatus) {
    axios.post('http://127.0.0.1:8000/api/task/', {
        project_id: project_id, 
        student_id: student_id, 
        tutor_id: "1", //set default
        task_created_date: taskCreatedDate,
        task_due_date: taskDueDate,
        task_type: taskType,
        status: taskStatus,
    })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response);
        })
}

