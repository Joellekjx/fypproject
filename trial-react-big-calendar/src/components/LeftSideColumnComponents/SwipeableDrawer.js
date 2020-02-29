import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({history}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    // currentPageEvent: '',
    // selectedIndex: 0
  });
  const [currentPageEvent, setCurrentPageEvent] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)

//   let history = useHistory()

  const toggleDrawer = (side, open) => (event) => {
      setState({...state, [side]: open})
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Weekly Report', 'Meetings', 'Strategy Plan', 'Interim Report', 'Final Report'].map((text, index) => (
          <ListItem button key={text} onClick={() => onClickHandler(text, index)}>
              {/* {console.log(text)} */}
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const onClickHandler = (text, index) => {
    setSelectedIndex(index)
    setCurrentPageEvent(text)
  }

    const renderSwitchCase = () => {
        switch(currentPageEvent){
            case 'Meetings':
            case 'Weekly Report':
            case 'Strategy Plan':
            case 'Interim Report':
            case 'Final Report':
                return history.push('/contentrouter')
            default:
                return "";
        }
    }

  return (
    <div style={{float: 'center', textAlign: 'center', paddingBottom: '5px'}}>
        <IconButton onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
        {renderSwitchCase()}
      </SwipeableDrawer>
    </div>
  );
}