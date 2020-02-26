import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Drawer } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentPageEvent, setCurrentPageEvent] = React.useState('Weekly Report');

  const handleClick = () => {
    setOpen(!open);
  };

  const renderSwitchCase = (param) => {
      switch(param){
        case 'Meetings':
            return <div>hello meetings</div>
        case 'Weekly Report':
            return <div>'hello weekly report';</div>
        default:
            return 'hello default';
      }
  }

  const onListClickEvent = (param) => {
      setCurrentPageEvent(param);
  }

  return (
      <div>
        <Drawer>
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
                </ListSubheader>
            }
            className={classes.root}
            >
            <ListItem button onClick={() => onListClickEvent('Weekly Report')}>
                <ListItemIcon>
                <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Weekly Report" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Meetings" />
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Other Submissions" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Strategy Plan" />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Interim Report" />
                </ListItem>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Final Report" />
                </ListItem>
                </List>
            </Collapse>
            </List>
        </Drawer>
        <main
        className={clsx(classes.content, {
        [classes.contentShift]: open,
        })}
        >
            <div className={classes.drawerHeader} />
            {renderSwitchCase(currentPageEvent)}
        </main>
  </div>
  );
}