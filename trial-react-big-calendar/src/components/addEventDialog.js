import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import EventForm from './eventForm';

export default function AddEventDialog() {
  console.log("this runs add event dialog once")
  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = (event) => {
    const project_id = event.target.elements.project_id.value;
    const student_id = event.target.elements.student_id.value;
    const tutor_id = event.target.elements.tutor_id.value;
    const task_type = event.target.elements.task_type.value;
    const task_due_date = event.target.elements.task_due_date.value;

    return axios.post('http://127.0.0.1:8000/api/task/', {
        project_id: project_id,
        student_id: student_id,
        tutor_id: tutor_id,
        task_type: task_type,
        task_created_date: new Date(),
        task_due_date: task_due_date,
        status: 'Pending' 
    })
    .then(res => console.log(res))
    .catch(error => console.err(error))
      
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EventForm onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => handleClose()} setOpen={setOpen}/>                      
      </Dialog>
    </div>
  );
}