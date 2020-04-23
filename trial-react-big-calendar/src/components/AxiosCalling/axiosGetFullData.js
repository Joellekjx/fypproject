import axios from 'axios';

/**
 * 
 * Will need a change in logic: 'weekly report' start time stays the same (take from task_due_date and set to 0000)
 * But 'meetings' will take indivRes.creation_date (or the more exact one)
 * This is for staff/profs only
 */

export default function axiosGetFullData(calendarStore, paramQuery) {
    const BASEURL = 'http://127.0.0.1:8000'
    var totalHours = 0;
    axios.get(`${BASEURL}/api/usersAndProjects/`)
        .then(res => {
            return res.data.find(item => {
                return item.id === calendarStore.getUserData.id
            })
        }).then(res => {
            res.projects.map((item, index) => {
                var color; //this is NOT GOOD PRACTICE, but i'm gg to hardcode the colors in
                switch(item.project_id){
                    case 1:
                        color = 'purple';
                        break;
                    case 2:
                        color = 'blue';
                        break;
                    case 3:
                        color = 'red';
                        break;
                    default:
                        color = '#F4F4F4';
                        break;
                }

                //Set checkboxes: item, key, name:
                calendarStore.setCheckboxes({
                    project_id: item.project_id,
                    tutor_id: item.tutor_id,
                    students: item.students,
                    label: item.project_name,
                    key: item.project_id,
                    name: item.project_name,
                    color: color,
                })
                var project_id = item.project_id
                axios.get(`${BASEURL}/api/taskComment/?project_id=${project_id}`, {
                    paramQuery
                })
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
                            calendarStore.addStaffStudentData({
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
                                documents: indivRes.documents,
                                project_name: item.project_name,
                                color: color
                            })
                        })
                        if (calendarStore.getTotalHoursSpent === "0") {
                            calendarStore.setTotalHoursSpent(totalHours);
                        }
                    })
            })
        })

}

