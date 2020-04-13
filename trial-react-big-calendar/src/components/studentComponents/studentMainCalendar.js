import React, { Component } from "react";
import EventForm from '../MainCalendarComponents/eventForm';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { withRouter } from "react-router-dom";
import '../styles.scss';
import WorkMonth from '../../lib/WorkMonth';
import { observer } from "mobx-react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, Typography } from "@material-ui/core";
import CustomEventWithPopover from '../MainCalendarComponents/indivEvent';
import { withStyles } from '@material-ui/core/styles';
import CustomToolBar from '../MainCalendarComponents/CustomToolBar';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

/**
 * Note to self: Need to make "add event" onClick in Calendar to be bug free
 */


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  dateHeaderStyle: {
    display: 'inline',
    fontFamily: 'Roboto',
    fontSize: '15px'
  }
});


const Event = ({ calendarStore }) => props => {
  return <CustomEventWithPopover event={props} calendarStore={calendarStore} />;
}

class StudentMainCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dayLayoutAlgorithm: 'no-overlap',
      isAddModalOpen: false,
      currentEvent: '',
    }
  }

  handleClose = () => {
    this.setState({ isAddModalOpen: false })
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

  renderEventMoreInfo = (event) => {
    const eventType = event.event_type;
    const { calendarStore } = this.props;
    const { addSelectedData, changeDefaultState } = calendarStore;

    addSelectedData({ //maybe need to remove liao since it doesn't seem to help v much lol
      Id: event.Id,
      title: event.title,
      start: event.start,
      end: event.end,
      event_type: event.event_type,
      status: event.status,
    });

    switch (eventType) {
      case "Weekly Report":
        changeDefaultState('Weekly Report');
        this.props.history.push('/contentrouter');
        break;
      case "Meeting Notes":
        changeDefaultState('Meetings');
        this.props.history.push('/contentrouter');
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
    return (
      <React.Fragment>
        <Dialog open={this.state.isAddModalOpen} onClose={this.handleClose}>
          <EventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
        </Dialog>
      </React.Fragment>
    )
  }

  render() {
    const { calendarStore, classes } = this.props;
    const { getData, getDataLength } = calendarStore; //why the fk is getDataLength affecting appearance??

    return (
      <div className="MainCalendar">
        <DnDCalendar
          // <Calendar
          selectable
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          defaultView="month"
          views={{ month: WorkMonth, week: true }}
          events={getData}
          localizer={localizer}
          onEventResize={this.onEventResize}

          resizable
          style={{ height: "100vh" }}
          // onSelectEvent={(event)=>this.renderEventMoreInfo(event)}
          components={{
            event: Event({
              calendarStore: calendarStore
            }),
            toolbar: CustomToolBar,
            month: {
              dateHeader: ({ label }) => {
                return (
                  <React.Fragment>
                    <Typography className={classes.dateHeaderStyle}>{label}</Typography>
                  </React.Fragment>
                )
              },
            },
          }}
          onSelectEvent={this.toggleEditModal}
          eventPropGetter={
            (event) => {
              let newStyle = {
                backgroundColor: "transparent",
                color: 'black',
                borderRadius: "0px",
                border: "none"
              };
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

StudentMainCalendar = observer(StudentMainCalendar);
export default withRouter((withStyles(useStyles)(StudentMainCalendar)));