import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import EventForm from './eventForm';

export default class AddEventButton extends Component {
  constructor(props){
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


  render(){
    const { calendarStore } = this.props;
    const { open } = this.state;
    // console.log(start.setHours(0, 0, 0, 0))
    var start = new Date();
    start.setHours(0, 0, 0,0);
    var end = new Date();
    end.setHours(0, 0, 0, 0);
    // console.log(start);
    return(
      <div style={{margin: '10px 0 0 10px'}}>
         <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
           Add Event
         </Button>
         <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <EventForm calendarStore={calendarStore} start={start} end={end} onSubmit={(event) => this.handleFormSubmit(event)} handleClose={() => this.handleClose()}/>                      
        </Dialog>
      </div>
    )
  }
}