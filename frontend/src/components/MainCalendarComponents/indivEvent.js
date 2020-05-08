import React, { Component } from 'react';
import moment from 'moment';
import { Paper, Popover, Button, Typography, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import history from '../../history';
import axiosDelete from '../AxiosCalling/axiosDelete';
import EventIcon from '@material-ui/icons/Event';
import NotesIcon from '@material-ui/icons/Notes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      minWidth: '300px',
      // height: theme.spacing(16),
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
  bodyText: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black',
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

  //Because staff should not have their own route, we need to find the student's id instead
  const onRoutingStaffButtonClick = () => {
    const eventType = event.event.event_type;
    var student_id = event.event.student_id;
    const { changeDefaultState, addSelectedData, setDefaultNestedState } = calendarStore;
    addSelectedData({ Id: event.event.Id })
    switch (eventType) {
      case "Weekly Report":
        changeDefaultState({ state: 'Weekly Report', index: 0 });
        history.push(`/${student_id}/content`);
        break;
      case "Meeting Notes":
        changeDefaultState({ state: 'Meetings', index: 1 });
        history.push(`/${student_id}/content`);
        break;
        case "Final Report":
          changeDefaultState({ state: 'Final Report', index: 2 })
          setDefaultNestedState(2)
          history.push(`/${student_id}/content`)
          break;
        case "Interim Report":
          changeDefaultState({ state: 'Interim Report', index: 2 })
          setDefaultNestedState(1)
          history.push(`/${student_id}/content`)
          break;
        case "FYP Plan Strategy":
          changeDefaultState({ state: 'Strategy Plan', index: 2 })
          setDefaultNestedState(0)
          history.push(`/${student_id}/content`)
          break;
      default:
        return "Nothing";
    }
  }

  const onRoutingStudentButtonClick = () => {
    const eventType = event.event.event_type;
    const { changeDefaultState, addSelectedData, getUserData, setDefaultNestedState } = calendarStore;
    var student_id = getUserData.id
    addSelectedData({ Id: event.event.Id })

    switch (eventType) {
      case "Weekly Report":
        changeDefaultState({ state: 'Weekly Report', index: 0 });
        history.push(`/${student_id}/content`);
        break;
      case "Meeting Notes":
        changeDefaultState({ state: 'Meetings', index: 1 });
        history.push(`/${student_id}/content`);
        break;
      case "Final Report":
        changeDefaultState({ state: 'Final Report', index: 2 })
        setDefaultNestedState(2)
        history.push(`/${student_id}/content`)
        break;
      case "Interim Report":
        changeDefaultState({ state: 'Interim Report', index: 2 })
        setDefaultNestedState(1)
        history.push(`/${student_id}/content`)
        break;
      case "FYP Plan Strategy":
        changeDefaultState({ state: 'Strategy Plan', index: 2 })
        setDefaultNestedState(0)
        history.push(`/${student_id}/content`)
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
          <Grid container style={{ width: '320px', height: 'auto' }} spacing={1}>
            <Grid item xs={1}>
              <div style={{ marginTop: '5px', width: '15px', height: '15px', float: 'center', backgroundColor: event.event.color }}></div>
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.heading}>{event.title}</Typography>
            </Grid>

            <Grid item xs={1}>
              <EventIcon fontSize="small" />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.secondaryHeading}>
                {formatDateView()}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <NotesIcon fontSize="small" />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.bodyText}>
                {event.event.project_name}
              </Typography>
              <Typography className={classes.bodyText}>
                Status: {event.event.status}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
              <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                <Button style={{ marginRight: '5px' }} onClick={onClickDelete}>
                  Delete
                </Button>
                {calendarStore.getUserData.is_staff === 0 ?
                  <Button variant="contained" color="primary" onClick={onRoutingStudentButtonClick}>
                    More Info
                  </Button>
                  :
                  <Button variant="contained" color="primary" onClick={onRoutingStaffButtonClick}>
                    More Info
                  </Button>
                }
                {/* <Button variant="contained" color="primary" onClick={onRoutingButtonClick}>
                  More Info
                </Button> */}
              </div>
            </Grid>
          </Grid>
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