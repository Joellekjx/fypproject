import React, { Component } from "react";
// import axios from 'axios';
import EventForm from './eventForm';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { withRouter } from "react-router-dom";
import './styles.scss';
import WorkMonth from '../lib/WorkMonth';
import { observer, PropTypes as MobXPropTypes } from "mobx-react";
// import * as dates from 'date-arithmetic'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import WeeklyReport from './weeklyReport';
import { Dialog } from "@material-ui/core";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


/**
 * Note to self: Need to spruce up "add event" onClick in Calendar + add event button
 * Likely have 1 pop-up form from MUI
 * Then onClick either button runs that mini component
 */

class MainCalender extends Component {
  constructor(props){
      super(props)
      this.state = {
        dayLayoutAlgorithm: 'no-overlap',
        isAddModalOpen: false,
        currentEvent: '',
      }
  };  

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

  routeToRightPage = (event) => { //maybe want to come back and double check this??
    const eventType = event.event_type;
    const { calendarStore } = this.props;
    const { addSelectedData } = calendarStore;
    console.log(event);
    console.log("inside routetorightpage");
    addSelectedData(event);

    switch(eventType){
      case "Weekly Report":
        this.props.history.push('/weeklyreport');
        break;
      case "Meeting Notes":
        this.props.history.push('/meetings');
        break;
      default:
        return "Nothing";
    }
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
              selectable
              defaultDate={new Date()}
              defaultView="month"
              views={{month: WorkMonth, week: true}}
              events={getData}
              localizer={localizer}
              onEventResize={this.onEventResize}
              resizable
              style={{ height: "100vh" }}
              onSelectEvent={(event)=>this.routeToRightPage(event)}
              // onSelectEvent={this.toggleEditModal}
              // eventPropGetter={event => this.renderEventStatusColour(event)}
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