import React from 'react';
import WorkMonth from '../../../lib/WorkMonth';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import CustomToolBar from '../CustomToolBar';
import { Dialog, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import CustomEventWithPopover from '../indivEvent';

import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

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


const StaffDndCalendar = (props) => {
  const { classes } = props;
    return(
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
          onSelectSlot={props.toggleAddModal}
          dayLayoutAlgorithm={props.dayLayoutAlgorithm}
        />
        </React.Fragment>
    )
}

export default withStyles(useStyles)(StaffDndCalendar)