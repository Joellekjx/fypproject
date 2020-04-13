import React, { Component } from 'react';
import moment from 'moment';
import { Paper, Popover, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import history from '../../history';
import axiosDelete from '../AxiosCalling/axiosDelete';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      minWidth: '300px',
      height: theme.spacing(16),
      padding: theme.spacing(3),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 'bold'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  eventTitle: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: '15px',
    display: 'inline'
  },
  eventTime: {
    fontFamily: 'Roboto',
    fontSize: '15px',
    display: 'inline'
  },
  dot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px'
  },
  dotPending: {
    backgroundColor: 'lightgreen'
  },
  dotCompleted: {
    backgroundColor: 'lightgrey'
  },
  dotLateSubmission: {
    backgroundColor: 'lightyellow'
  },
  dotLate: {
    backgroundColor: '#ffcccb'
  }
}));

export default function CustomEventWithPopover(props) {
  const classes = useStyles();
  const { event, calendarStore } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = e => { //i think smth is wrong here...
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onRoutingButtonClick = () => {
    const eventType = event.event.event_type;
    const { changeDefaultState, addSelectedData } = calendarStore;
    addSelectedData({ Id: event.event.Id })

    switch (eventType) {
      case "Weekly Report":
        changeDefaultState({ state: 'Weekly Report', index: 0 });
        history.push('/contentrouter');
        break;
      case "Meeting Notes":
        changeDefaultState({ state: 'Meetings', index: 1 });
        history.push('/contentrouter');
        break;
      default:
        return "Nothing";
    }
  }

  const formatDateView = () => {
    //this is so that if meetings ever cross days (e.g. 12 March 2020 2pm - 13 March 2020 3pm for what ever reason)
    //we can set it properly
    var eventStart = event.event.start;
    var eventEnd = event.event.end;
    // console.log(event.title);
    var eventStartFormat = moment(eventStart).format('dddd, MMMM DD YYYY')
    switch (event.title) {
      case "Meeting Notes":
        return (
          <React.Fragment>
            {eventStartFormat} &bull; {`${moment(event.event.start).format('HH:mm')}-${moment(event.event.end).format('HH:mm')} `}
          </React.Fragment>
        )
      default:
        return (
          <React.Fragment>
            {eventStartFormat}
          </React.Fragment>
        )
    }
  }

  const onClickDelete = () => {
    const { deleteSelectedEvent } = calendarStore;
    //Delete in backend
    axiosDelete(event.event.Id);

    //Delete in frontend/store
    deleteSelectedEvent(event.event.Id)

    alert("Event deleted")
    //Once deleted, close popover
    handleClose();
  }

  // Other things you can add: Meeting's description (mainly location), status of submission, whether there's attachments
  const renderPopoverPaper = () => {
    //NOTE: pls check how to pass the Id and wtf is Data? LOL
    return (
      <div className={classes.root}>
        <Paper style={{ position: 'relative' }}>
          <Typography className={classes.heading}>{event.title}</Typography>
          {/* {event.title} */}
          {/* <Typography className={classes.secondaryHeading}>{event.event.content}</Typography> */}
          <Typography className={classes.secondaryHeading}>
            {formatDateView()}
          </Typography>
          <div style={{ position: 'absolute', bottom: '0', float: 'right', paddingBottom: '15px' }}>
            <Button style={{ marginRight: '5px' }} onClick={onClickDelete}>
              Delete
                    </Button>
            <Button variant="contained" color="primary" onClick={onRoutingButtonClick}>
              More Info
                    </Button>
          </div>
        </Paper>
      </div>
    )
  }

  const renderStatusDot = () => {
    var status = props.event.event.status
    switch (status) {
      case "Completed":
        return <div className={`${classes.dot} ${classes.dotCompleted}`}></div>
      case "Pending":
        return <div className={`${classes.dot} ${classes.dotPending}`}></div>
      case "Late Submission":
        return <div className={`${classes.dot} ${classes.dotLateSubmission}`}></div>
      case "Late":
        return <div className={`${classes.dot} ${classes.dotLate}`}></div>
      default:
        return <div className={`${classes.dot} ${classes.dotPending}`}></div>
    }
  }

  return (
    <div>
      <div>
        <div onClick={handleClick}>
          {/* Need to show timing here. How to check?
              1. Check if the creation date == due date (disregarding timing), if so, then reflect the time
              2. If the creation date != due date, don't show timing (a.k.a it's a full day event)
              Why? Because when we post a weekly report (a full day event), only due date is reflected/updated
              For meetings, creation date will be the start time of meeting, due date is the end time of the meeting
             */}
          {renderStatusDot()}
          <Typography className={classes.eventTime}>
            {event.title === 'Meeting Notes' ? `${moment(event.event.start).format('HH:mm')} - ${moment(event.event.end).format('HH:mm')} ` : ''}
          </Typography>
          <Typography className={classes.eventTitle}>
            {event.title === "Meeting Notes" ? 'Meeting' : event.title}
          </Typography>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {renderPopoverPaper()}
          {/* hello testing */}
        </Popover>
      </div>
    </div>
  )
};