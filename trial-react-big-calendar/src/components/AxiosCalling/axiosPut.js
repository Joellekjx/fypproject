import axios from 'axios';

//axios put update a task
//updates only: status, hours spent and thingscompleted
export default function axiosPut(Id, task_type, task_created_date, task_due_date, projectId, studentId, tutorId, taskStatus, thingsCompleted, hoursSpent){
    axios.put("http://127.0.0.1:8000/api/task/"+ Id, {
        // task_id: Id,
        // task_type: task_type,
        // task_created_date: task_created_date,
        // task_due_date: task_created_date,
        submission_date: task_due_date,
        // project_id: projectId,
        // student_id: studentId,
        // tutor_id: tutorId,
        status: taskStatus,
        hours_spent: hoursSpent,
        content: thingsCompleted,
    })
    .then(response=>{
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    })
}

