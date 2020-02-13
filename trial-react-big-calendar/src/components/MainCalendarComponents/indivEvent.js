import React, { Component } from 'react';
import moment from 'moment';
import { Paper, Popover, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import history from '../../history';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
      //   margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
        padding: theme.spacing(5),
      },
    },
  }));

export default function CustomEventWithPopover(props){
    const classes = useStyles();
    const { event, calendarStore } = props;
      const [anchorEl, setAnchorEl] = React.useState(null);
  
      const handleClick = e => { //i think smth is wrong here...
        // console.log(event);
        setAnchorEl(e.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
  
      const onRoutingButtonClick = () => {
        const eventType = event.event.event_type;
        const { changeDefaultState, getDefaultState } = calendarStore;
  
        switch(eventType){
          case "Weekly Report":
            changeDefaultState('Weekly Report');
            history.push('/contentrouter');
            break;
          case "Meeting Notes":
            changeDefaultState('Meetings');
            history.push('/contentrouter');
            break;
          default:
            return "Nothing";
        }
      }
  
      const renderPopoverPaper = () => {
        var eventStart = event.start;
        return(
          <div className={classes.root}>
              <Paper>
                  can i use a paper<br/>
                  {event.title}
                  {event.content}
                  {event.Id}
                  {moment(eventStart).format('lll')}
                  <Button>
                      {/* This should do an axios delete */}
                      Delete
                  </Button>
                  <Button variant="contained" color="primary" onClick={onRoutingButtonClick}>
                      More Info
                  </Button>
              </Paper>
          </div>
        )
      }
  
      // console.log(event);
      // console.log("this is event.start in indivevent")
    return(
        <div>
          <div>
           <div onClick={handleClick}>
             {/* Need to show timing here. How to check?
              1. Check if the creation date == due date (disregarding timing), if so, then reflect the time
              2. If the creation date != due date, don't show timing (a.k.a it's a full day event)
              Why? Because when we post a weekly report (a full day event), only due date is reflected/updated
              For meetings, creation date will be the start time of meeting, due date is the end time of the meeting
             */}
             {event.title === 'Weekly Report' ? null : `${moment(event.event.start).format('HH:mm')}-${moment(event.event.end).format('HH:mm')}`}
             &nbsp;
             {event.title}
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