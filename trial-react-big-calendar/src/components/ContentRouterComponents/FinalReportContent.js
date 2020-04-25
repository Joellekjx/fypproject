import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Typography, Grid, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { Button } from '@material-ui/core'
import RenderDocumentPreview from './renderDocumentPreview';
import axiosPostComment from '../AxiosCalling/axiosPostComment';
import InterimReportRenderDocument from './InterimReportRenderDocument';
import ReusableCommentBox from './ContentRouterReusableComponents/ReusableCommentBox';


const drawerWidth = 400;

const useStyles = (theme) => ({
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
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
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
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    textHeader: {
        lineHeight: '36px',
        color: 'grey'
    },
    fileHeader: {
        fontWeight: '500',
        lineHeight: '36px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: 'bold'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: '15px',
        marginTop: '15px',
        minHeight: '200px',
    }
});

class FinalReportContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true, //set blank open
            noOfComments: 0,
            documentName: 'Untitled',
            id: 0, //event id
            user_id: 0, //user_id
            comments: "",
            // dataArray: this.props.calendarStore.getData,
        }
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.calendarStore.getUserData.id
        })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    renderDocumentContent = () => {
        const { calendarStore, classes } = this.props;
        const { getData } = calendarStore;
        return (
            getData.filter(indivData => indivData.event_type === 'Final Report')
                .map((text) => {
                    if (this.state.id === 0) {
                        this.setState({ id: text.Id, comments: text.comments })
                    }
                    return text.documents.map((document, index) => {
                        return (
                            <React.Fragment key={index}>
                                <InterimReportRenderDocument
                                    uploaded_date={document.uploaded_date}
                                    document={document}
                                    index={index}
                                />
                            </React.Fragment>
                        )
                    })
                })
        )
    }

    render() {
        const { classes, calendarStore } = this.props;
        return (
            <div className={classes.root}>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                >
                    <div>
                        <Grid container spacing={1}>
                            <Grid item container>
                                <Grid item xs={12} lg={5} md={5}>
                                    <Typography className={classes.textHeader}>
                                        File Name
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={3} md={3}>
                                    <Typography className={classes.textHeader}>
                                        Uploaded Date
                                </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} md={2} style={{ textAlign: 'right' }}>
                                    <Button color="primary" variant="outlined">
                                        Upload Final Report
                                    </Button>
                                </Grid>
                                {
                                    this.state.open ?
                                        ''
                                        :
                                        <Grid item xs={12} lg={2} md={2} style={{ textAlign: 'center' }}>
                                            <Button variant="contained" color="primary" onClick={() => this.handleDrawerOpen()}>
                                                View Comments
                                            </Button>
                                        </Grid>
                                }
                            </Grid>
                            <hr style={{ width: '100%' }}></hr>
                            {this.renderDocumentContent()}
                        </Grid>
                    </div>
                </main>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose} style={{ float: 'right' }}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem>
                            <Typography style={{ fontWeight: '600' }}>{this.state.comments.length} comments on Final Report</Typography>
                        </ListItem>
                        <ListItem>
                            <ReusableCommentBox 
                                comments={this.state.comments}
                                calendarStore={calendarStore}
                                id={this.state.id}
                                user_id={this.state.user_id}
                            />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }
}

FinalReportContent = observer(FinalReportContent)
export default withStyles(useStyles)(FinalReportContent)