import React, { Component } from "react";
import EventForm from './MainCalendarComponents/eventForm';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { withRouter } from "react-router-dom";
import './styles.scss';
import WorkMonth from '../lib/WorkMonth';
import { observer } from "mobx-react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, Tooltip, Paper, Popover, Button } from "@material-ui/core";
// import { HashLink as Link } from 'react-router-hash-link';
import Event from './MainCalendarComponents/indivEvent';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


/**
 * Note to self: Need to spruce up "add event" onClick in Calendar + add event button
 * Likely have 1 pop-up form from MUI
 * Then onClick either button runs that mini component
 */

// function Event({event}){ //you can use this to further style the look of each event
//   return (
//     <span>
//         <strong>{event.title}</strong>
//         {event.desc && ':  ' + event.desc}
//     </span>
//   )
// }



class MainCalender extends Component {
  constructor(props){
      super(props)
      this.state = {
        dayLayoutAlgorithm: 'no-overlap',
        isAddModalOpen: false,
        currentEvent: '',
        // isEventDialogOpen: false,
      }
  }  

  handleClose = () => {
    this.setState({isAddModalOpen: false })
  }
    
  onEventResize = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  // moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) { //a lil buggy
  //   const { events } = this.state

  //   const idx = events.indexOf(event)
  //   let allDay = event.allDay

  //   if (!event.allDay && droppedOnAllDaySlot) {
  //     allDay = true
  //   } else if (event.allDay && !droppedOnAllDaySlot) {
  //     allDay = false
  //   }

  //   const updatedEvent = { ...event, start, end, allDay }

  //   const nextEvents = [...events]
  //   nextEvents.splice(idx, 1, updatedEvent)

  //   this.setState({
  //     events: nextEvents,
  //   })
  // }

  // const { onClose, selectedValue, open } = props;

  // handleDialogClose = () => {
  //   // onClose(selectedValue);
  //   this.setState({ isEventDialogOpen: false })
  // };

  renderEventMoreInfo = (event) => {
    const eventType = event.event_type;
    const { calendarStore } = this.props;
    const { addSelectedData, changeDefaultState } = calendarStore;
    // return(
    //   <div>
    //     {/* Consider using a dialog la lol */}
    //     <Dialog onClose={this.handleDialogClose} open>
    //       <Paper style={{display: 'flex', flexWrap: 'wrap'}} elevation={2}>
    //         {event.title}
    //         {console.log("click inside paper???")}
    //         hello
    //       </Paper>
    //     </Dialog>
    //   </div>
    // )
    // const { currentEvent } = this.state;
    // // const { calendarStore } = this.props;
    // return(
    //   <React.Fragment>
    //     <Dialog open={this.state.isAddModalOpen} toggle={this.toggleAddModal} onClose={this.handleClose}>
    //       <EventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
    //     </Dialog>
    //   </React.Fragment>
    // )
    addSelectedData({ //maybe need to remove liao since it doesn't seem to help v much lol
      Id: event.Id,
      title: event.title,
      start: event.start,
      end: event.end,
      event_type: event.event_type,
      status: event.status,
    });

    // switch(eventType){
    //   case "Weekly Report":
    //     changeDefaultState('Weekly Report');
    //     this.props.history.push('/contentrouter');
    //     break;
    //   case "Meeting Notes":
    //     changeDefaultState('Meetings');
    //     this.props.history.push('/contentrouter');
    //     break;
    //   default:
    //     return "Nothing";
    // }
  }

  toggleAddModal = (event) => {
      this.setState({
        currentEvent: event,
        isAddModalOpen: !this.state.isAddModalOpen,
      })
  };

  renderDialog = () => {
    const { currentEvent } = this.state;
    const { calendarStore } = this.props;
    // console.log(currentEvent.start)
    return(
      <React.Fragment>
        <Dialog open={this.state.isAddModalOpen} toggle={this.toggleAddModal} onClose={this.handleClose}>
          <EventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
        </Dialog>
      </React.Fragment>
    )
  }

  render(){
    const { calendarStore } = this.props;
    const { getData, getDataLength } = calendarStore; //why the fk is getDataLength affecting appearance??
    return(
      <div className="MainCalendar">
          <DnDCalendar
          // <Calendar
              selectable
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              defaultView="month"
              views={{month: WorkMonth, week: true}}
              events={getData}
              localizer={localizer}
              onEventResize={this.onEventResize}
              
              resizable
              style={{ height: "100vh" }}
              // onSelectEvent={(event)=>this.renderEventMoreInfo(event)}
              components={{
                event: Event
                // agenda: {
                //   event: this.EventAgenda,
                // },
              }}
              onSelectEvent={this.toggleEditModal}
              eventPropGetter={
                (event) => {
                  let newStyle = {
                    backgroundColor: "lightgrey",
                    color: 'black',
                    borderRadius: "0px",
                    border: "none"
                  };
                  switch(event.status){
                    case "Completed":
                      newStyle.backgroundColor = "lightgrey"; break;
                    case "Pending":
                      newStyle.backgroundColor = "lightgreen"; break;
                    case "Late Submission":
                      newStyle.backgroundColor = "lightyellow"; break;
                    case "Late":
                      newStyle.backgroundColor = "#ffcccb"; break;
                    default:
                      newStyle.backgroundColor = "lightgreen"; break;
                  }
                  return {
                    className: "",
                    style: newStyle
                  };
                }
              }
              onSelectSlot={this.toggleAddModal}
              dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
          />
          {this.renderDialog()}
      </div>
    )
  }
}

MainCalender = observer(MainCalender);
export default withRouter(MainCalender);