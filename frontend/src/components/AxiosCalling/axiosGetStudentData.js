import axios from 'axios';

/**
 * 
 * Will need a change in logic: 'weekly report' start time stays the same (take from task_due_date and set to 0000)
 * But 'meetings' will take indivRes.creation_date (or the more exact one)
 * This is only for students
 */

export default function axiosGetStudentData(calendarStore, student_id) {
    var totalHours = 0;
    axios.get('http://127.0.0.1:8000/api/taskComment/?student_id=' + student_id)
        .then(res => {
            res.data.map(indivRes => {
                var starttime;
                switch (indivRes.task_type) {
                    case "Meeting Notes":
                        starttime = new Date(indivRes.task_created_date);
                        break;
                    default:
                        var start = new Date(indivRes.task_due_date);
                        starttime = new Date(start.setHours(0, 0, 0, 0));
                        break;
                }
                var endtime = new Date(indivRes.task_due_date);
                totalHours += indivRes.hours_spent

                //Will be changing calendarStore => addData change to addSpecificStudentData ==> this is used to map in studentMainCalendar
                //Then add a new addStaffsStudentsData ==> this is used to map in staffMainCalendar
                calendarStore.addData({
                    Id: indivRes.task_id,
                    title: indivRes.task_type,
                    start: starttime,
                    end: endtime,
                    event_type: indivRes.task_type,
                    status: indivRes.status,
                    content: indivRes.content,
                    hours_spent: indivRes.hours_spent,
                    submission_date: indivRes.submission_date,
                    project_id: indivRes.project_id,
                    student_id: indivRes.student_id,
                    tutor_id: indivRes.tutor_id,
                    comments: indivRes.comments,
                    documents: indivRes.documents
                })
            })
            if (calendarStore.getTotalHoursSpent === "0") {
                calendarStore.setTotalHoursSpent(totalHours);
            }
        })
}

