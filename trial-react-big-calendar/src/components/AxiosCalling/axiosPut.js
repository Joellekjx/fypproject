import axios from 'axios';

//axios put update a task
//updates only: status, hours spent and thingscompleted
export default function axiosPut(Id, task_type, task_created_date, task_due_date, projectId, studentId, tutorId, taskStatus, thingsCompleted, hoursSpent){
    axios.put(`http://127.0.0.1:8000/api/taskComment/${Id}/`, {
        task_id: Id,
        project_id: projectId,
        student_id: studentId,
        tutor_id: tutorId,
        task_type: task_type,
        task_created_date: task_created_date,
        task_due_date: task_created_date,
        submission_date: task_due_date,
        content: thingsCompleted,
        hours_spent: hoursSpent,
        status: taskStatus,
        desc: null,
    })
    .then(response=>{
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    })
}

