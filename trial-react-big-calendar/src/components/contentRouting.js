import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WeeklyReportContent from './ContentFolder/weeklyReportContent';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemText } from '@material-ui/core';
import axiosGet from './AxiosCalling/axiosGet';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function WeeklyReport({ calendarStore }){
  console.log(calendarStore.getData);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
    const pageEvents = ['Weekly Report', 'Meetings', 'Other Submissions'];
    const [currentPageEvent, setCurrentPageEvent] = React.useState(calendarStore.getDefaultState);
    // console.log(this.props.location.state.defaultState);
    console.log(calendarStore.getDefaultState);
    console.log("inside contentrouting");

    async function fetchData(){
      if(calendarStore.getData.length == 0){
        axiosGet(calendarStore);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return ( //Note: pls change the color of the app bar/toolbar lol
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{width: "100%"}}>
            <div style={{float: 'left'}}>
            <Typography variant="h6" noWrap>
                {currentPageEvent}
            </Typography>
            </div>
            <div style={{float: 'right'}}>
            <Typography variant="subtitle1" noWrap>
                Total no. of hours: 34 
                {/* rmb to change the "hours" */}
            </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pageEvents.map((text, index) => (
            <ListItem button key={text} onClick={() => setCurrentPageEvent(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <WeeklyReportContent />
      </main>
    </div>
  );
}

// class WeeklyReport extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//           task: [],
//         }
//     };  

//     render(){
//         const { calendarStore } = this.props;
//         const { getSelectedData } = calendarStore;
//         console.log(getSelectedData);
//         return(
//             <div>
//                 {/* <WeeklyReportNavigation /> */}
//             </div>
//         )
//     }
// }

// export default WeeklyReport;
