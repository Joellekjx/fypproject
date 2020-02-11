import React from 'react';
import moment from 'moment';
import { Paper, Popover } from '@material-ui/core';

/**
 * Purpose of indivEvent: prints out each event with an added Popover functionality
 * The popover contains a <Paper/> with contents like (1) title (2) content (3) start and end times (4) delete button (5) link to next page button/'see more'
 */

export default function Event({ event }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    const renderPopoverPaper = () => {
      var eventStart = event.start;
  
      return(
        <Paper>
          can i use a paper<br/>
          {event.title}
          {event.content}
          {event.Id}
          {/* {event.start.map(datum => return datum)} */}
          {/* {event.start} */}
          {console.log(moment(eventStart).format('lll'))}
          {moment(eventStart).format('lll')}
        </Paper>
      )
    }
  
    // console.log(event); //but this is every single event??? LOL how to determine sia liddat -- need to find an onclick tt passes the exact event
    return (
      <div>
        <div>
          {/* <div>{event.title}</div> */}
          {/* <Button variant="contained" color="primary" onClick={handleClick}>{event.title}</Button> */}
          <div onClick={handleClick}>
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
            {/* <div>{event.title}</div> */}
            {/* Content of popover
            {event.title} */}
            {renderPopoverPaper()}
          </Popover>
        </div>
      </div>
    );
  }