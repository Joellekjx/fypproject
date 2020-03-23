import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import WeeklyReportContent from './ContentRouterComponents/weeklyReportContent';
import MeetingsContent from './ContentRouterComponents/meetingsContent';
import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider, IconButton, ListItem, ListItemText, Box, Button, Collapse
} from '@material-ui/core';
import axiosGetFullData from './AxiosCalling/axiosGetFullData';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#2A2C5D',
        color: 'white'
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
    selected: {
        "&.Mui-selected": {
            backgroundColor: "rgba(128, 128, 128, 0.2)",
            width: "100%",
            float: "left",
        }
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
})


class ContentRoutingTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            pageEvents: ['Weekly Report', 'Meetings', 'Other Submissions'],
            currentPageEvent: 'Weekly Report',
            selectedIndex: 0,
            selectedNestedIndex: '',
            openNested: false,
        }
    }

    handleNestedClick = () => {
        this.setState({
            openNested: !this.state.openNested
        })
    };

    componentDidMount() {
        const { calendarStore } = this.props;
        if (calendarStore.getData.length === 0) {
            axiosGetFullData(calendarStore);
        }
        this.setState({
            currentPageEvent: calendarStore.getDefaultState.state,
            selectedIndex: calendarStore.getDefaultState.index
        })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }


    renderSwitchCase = (param) => {
        const { calendarStore } = this.props;
        switch (param) {
            case 'Meetings':
                return <MeetingsContent calendarStore={calendarStore} />
            case 'Weekly Report':
                return <WeeklyReportContent calendarStore={calendarStore} />
            case 'Strategy Plan':
                return "Hello strategy"
            case 'Interim Report':
                return "Hello interim"
            case 'Final Report':
                return "Hello final"
            default:
                return "No drawer found";
        }
    }

    onClickHandler = (text, index) => {
        switch (text) {
            case 'Meetings':
            case 'Weekly Report':
                this.setState({
                    currentPageEvent: text,
                    selectedIndex: index,
                    selectedNestedIndex: ''
                })
                break;
            default:
                this.setState({
                    currentPageEvent: text,
                    selectedIndex: '',
                    selectedNestedIndex: index
                })
                return null;
        }
    }

    determineTotalHourView = () => {
        const { calendarStore } = this.props;
        const { currentPageEvent } = this.state;
        return currentPageEvent === "Weekly Report" ? "Total no. of hours: " + calendarStore.getTotalHoursSpent : "";
    }

    render() {
        const { classes } = this.props;
        const { open, openNested, currentPageEvent, selectedIndex, selectedNestedIndex } = this.state;

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
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div style={{ width: "100%" }}>
                            <div style={{ float: 'left', width: '50%' }}>
                                <div style={{ float: 'left' }}>
                                    <Typography variant="h5" noWrap>
                                        <Box fontWeight="fontWeightBold">
                                            {currentPageEvent}
                                        </Box>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" noWrap style={{ paddingTop: '4px', paddingLeft: '2%' }}>
                                        {this.determineTotalHourView()}
                                    </Typography>
                                </div>
                            </div>

                            <div style={{ float: 'right', width: '50%' }}>
                                <div style={{ float: 'right' }}>
                                    <Button onClick={() => this.props.history.push('/')} style={{ color: 'white' }}>Return to main calendar</Button>
                                </div>
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
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Weekly Report', 'Meetings'].map((text, index) => (
                            <ListItem
                                selected={selectedIndex === index}
                                button key={text}
                                onClick={() => this.onClickHandler(text, index)}
                                classes={{
                                    selected: classes.selected
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => this.handleNestedClick()}>
                            <ListItemText primary="Other Submissions" />
                            {openNested ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openNested} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {['Strategy Plan', 'Interim Report', 'Final Report'].map((text, index) => (
                                    <ListItem
                                        selected={selectedNestedIndex === index}
                                        button
                                        key={text}
                                        className={classes.nested}
                                        onClick={() => this.onClickHandler(text, index)}
                                        classes={{
                                            selected: classes.selected
                                        }}
                                    >
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
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
                    {this.renderSwitchCase(currentPageEvent)}
                </main>
            </div>
        );
    }
}

ContentRoutingTest = observer(ContentRoutingTest);
export default withStyles(useStyles)(ContentRoutingTest);
