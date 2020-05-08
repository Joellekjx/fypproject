import React from 'react';
import WorkMonth from '../../../lib/WorkMonth';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import CustomToolBar from '../CustomToolBar';
import { Dialog, Typography } from "@material-ui/core";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CustomEventWithPopover from '../indivEvent';
import { withStyles } from '@material-ui/core/styles'
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

/**
 * 
 * @props eventsData
 * @props onEventResize
 * @props calendarStore
 * @props toggleAddModal
 * @props dayLayoutAlgorithm
 */

const Event = ({ calendarStore }) => props => {
  return <CustomEventWithPopover event={props} calendarStore={calendarStore} />;
}

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

const StudentDndCalendar = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <DnDCalendar
        // <Calendar
        selectable
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        views={{ month: WorkMonth, week: true }}
        events={props.eventsData}
        localizer={localizer}
        onEventResize={props.onEventResize}

        resizable
        style={{ height: "100vh" }}
        // onSelectEvent={(event)=>this.renderEventMoreInfo(event)}
        components={{
          event: Event({
            calendarStore: props.calendarStore
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
        //   onSelectEvent={this.toggleEditModal}
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
        onSelectSlot={props.toggleAddModal}
        dayLayoutAlgorithm={props.dayLayoutAlgorithm}
      />
    </React.Fragment>
  )
}

export default withStyles(useStyles)(StudentDndCalendar)