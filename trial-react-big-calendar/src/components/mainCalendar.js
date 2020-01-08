import React, { Component } from "react";
import axios from 'axios';
import EventForm from './eventForm';
import { Calendar, momentLocalizer, Navigate } from 'react-big-calendar';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { withRouter } from "react-router-dom";
import './styles.scss';
import WorkMonth from '../lib/WorkMonth';
import { observer, PropTypes as MobXPropTypes } from "mobx-react";
// import * as dates from 'date-arithmetic'
import AddEventDialog from './addEventDialog';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import TimeGrid from 'react-big-calendar/lib/TimeGrid'
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
        task: [],
        events: [ //prolly dont need this alr
          // {
          //   id: 0,
          //   start: new Date(),
          //   end: new Date(moment().add(5, "days")),
          //   title: "Some title",
          //   event_type: 'Weekly Report'
          // },
          // {
          //   id: 1,
          //   start: new Date(2019, 11, 2),
          //   end: new Date(moment().subtract(20, "days")),
          //   title: "What",
          //   event_type: 'Meeting'
          // }
        ],
        dayLayoutAlgorithm: 'no-overlap',
        isAddModalOpen: false,
      }
  };  

  componentDidMount(){
    const { calendarStore } = this.props;
    const { addData, getData } = calendarStore;
    axios.get('http://127.0.0.1:8000/api/task/')
        .then(res => {
            res.data.map(indivRes => {
              this.setState(prevState => ({
                task:[...prevState.task, indivRes]
              }))
              var start = new Date(indivRes.task_due_date);
              var starttime = new Date(start.setHours(0, 0, 0, 0));
              var end = new Date(indivRes.task_due_date);
              
              if(getData.length != res.data.length) {
                addData({Id: indivRes.task_id, title: indivRes.task_type, start: starttime, end: end, event_type: indivRes.task_type})
              }
            })
        })
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

  routeToRightPage = (event) => {
      const eventType = event.event_type;
      if (eventType === 'Weekly Report') {
          this.props.history.push('/weeklyreport')
      } else if (eventType==='Meeting'){
          this.props.history.push('/meetings')
      } else {
          return "Nothing";
      }
  }

  toggleAddModal = event => {
      this.setState({
        currentEvent: event,
        isAddModalOpen: !this.state.isAddModalOpen,
      })
  };

  renderDialog = () => {
    return(
      <React.Fragment>
        <Dialog open={this.state.isAddModalOpen} toggle={this.toggleAddModal} onClose={this.handleClose}>
          <EventForm handleClose={() => this.handleClose()} />
        </Dialog>
      </React.Fragment>
    )
  }

  render(){
    const { calendarStore } = this.props;
    const { getData } = calendarStore;
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