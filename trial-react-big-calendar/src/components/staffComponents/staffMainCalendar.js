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
import StaffEventForm from './staffEventForm';

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
  // console.log(props)
  // console.log("props hello?")
  return <CustomEventWithPopover event={props} calendarStore={calendarStore} />;
}

class StaffMainCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dayLayoutAlgorithm: 'no-overlap',
      isAddModalOpen: false,
      currentEvent: '',
      // eventList: this.props.calendarStore.getStaffStudentFilteredData
    }
  }

  // componentDidMount(){
  //   const { calendarStore } = this.props;
  //   const { getStaffStudentFilteredData } = calendarStore;
  //   this.setState({
  //     eventList: getStaffStudentFilteredData
  //   })
  // }

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
          {/* Reroute eventform to staffeventform */}
          <StaffEventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
          {/* <EventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} /> */}
        </Dialog>
      </React.Fragment>
    )
  }

  render() {
    const { calendarStore, classes } = this.props;
    // const { getData, getDataLength } = calendarStore; //why the fk is getDataLength affecting appearance??
    const { getStaffStudentFilteredData, getStaffStudentFilteredDataLength } = calendarStore;
    // console.log(getStaffStudentFilteredData)
    // console.log("do u even rerender???")
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
          events={this.props.calendarStore.getStaffStudentFilteredData}
          // events={this.state.eventList}
          localizer={localizer}
          onEventResize={this.onEventResize}

          resizable
          style={{ height: "100vh" }}
          // onSelectEvent={(event)=>this.renderEventMoreInfo(event)}
          components={{
            event: Event({
              calendarStore: calendarStore,
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
                backgroundColor: "#F4F4F4",
                color: 'black',
                borderRadius: "0px",
                border: "none"
              };
              switch (event.project_id) { //I know this is a stupid way to sort la lol but we will find a better way... next time
                case 1:
                  newStyle.borderLeft = "5px solid purple"; break;
                case 2:
                  newStyle.borderLeft = "5px solid blue"; break;
                case 3:
                  newStyle.borderLeft = "5px solid yellow"; break;
                default:
                  newStyle.borderLeft = "5px solid #F4F4F4"; break;
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

StaffMainCalendar = observer(StaffMainCalendar);
export default withRouter((withStyles(useStyles)(StaffMainCalendar)));