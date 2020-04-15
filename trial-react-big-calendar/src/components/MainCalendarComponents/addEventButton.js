import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import EventForm from './eventForm';
import StaffEventForm from '../staffComponents/staffEventForm';

export default class AddEventButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // const [open, setOpen] = React.useState(false);
      open: false,
      // start: new Date(),
    }
  }

  handleClickOpen = () => {
    // setOpen(true);
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    // setOpen(false);
    this.setState({
      open: false
    })
  };


  render() {
    const { calendarStore, type } = this.props;
    console.log(type)
    console.log("is this accessible??")
    const { open } = this.state;
    // console.log(start.setHours(0, 0, 0, 0))
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(0, 0, 0, 0);
    // console.log(start);
    return (
      <div style={{ margin: '10px 0 10px 0', textAlign: 'center' }}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Event
         </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* Need to determine if student or staff then route to eventform or staffeventform */}
          {type === 'Student' ?
            <EventForm calendarStore={calendarStore} start={start} end={end} onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => this.handleClose()} />
            :
            <StaffEventForm calendarStore={calendarStore} start={start} end={end} onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => this.handleClose()} />
          }

        </Dialog>
      </div>
    )
  }
}