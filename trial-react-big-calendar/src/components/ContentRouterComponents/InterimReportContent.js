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


const drawerWidth = 340;

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
    }
});

class InterimReportContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, //set blank open
            noOfComments: 0,
            documentName: 'Untitled'
        }
    }

    handleDrawerOpen = (documentName, noOfComments, id, user_id) => {
        console.log(id)
        console.log(user_id)
        console.log("can i detect the id and user_id here???")
        this.setState({ open: true, documentName: documentName, noOfComments: noOfComments })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    renderDocumentContent = () => {
        const { calendarStore, classes } = this.props;
        var user_data_id = calendarStore.getUserData.id
        const { getData } = calendarStore;
        return (
            getData.filter(indivData => indivData.event_type === 'Interim Report')
                .map((text) => {
                    console.log(text)
                    return text.documents.map((document, index) => {
                        var regexToRemoveFrontOfURL = /^(http\:\/\/127\.0\.0\.1\:8000\/media\/files\/)/gm
                        const documentName = document.attach_document.replace(regexToRemoveFrontOfURL, "");
                        const noOfComments = text.comments.length
                        return (
                            <React.Fragment key={index}>
                                <InterimReportRenderDocument
                                    documentName={documentName}
                                    uploaded_date={document.uploaded_date}
                                    comments={text.comments}
                                    document={document}
                                    index={index}
                                    noOfComments={noOfComments}
                                    handleDrawerOpen={this.handleDrawerOpen}
                                    id={text.Id}
                                    user_id={user_data_id}
                                />
                            </React.Fragment>
                        )
                    })
                })
        )
    }

    renderCommentSection = () => {
        return (
            <div>
                Blah commenst
            </div>
        )
    }

    onSubmitComment = (e) => {
        e.preventDefault();
        const { comment, buttonLabelState } = this.state;
        const { id, user_id } = this.props;
        // id={text.Id} user_id={user_data_id}
        var creation_date = moment()
        //bruh: u need to be able to determine if the user is student or tutor -- next time when logging in is available
        if (comment === "") {
            alert("Please fill in a comment before submitting");
        } else {
            axiosPostComment(id, user_id, comment, creation_date);

            //Update calendar store so that comment will be reflected
            this.updateCalendarStore();

            //clear comment box:
            this.clearCommentBox();
        }
    }

    addAComment = (buttonLabel) => {
        const { comment } = this.state;
        const { classes } = this.props;
        return (
            <form noValidate autoComplete="off" onSubmit={this.onSubmitComment} method="POST">
                <div>
                    <Paper elevation={2} style={{ width: '70%' }} className={classes.paper}>
                        <TextField
                            multiline
                            rows="5"
                            style={{
                                width: '100%'
                            }}
                            value={comment}
                            onChange={this.handleChange}
                            name="comment"
                            placeholder="Type in your comments"
                        ></TextField>
                        <br /><br />
                        <Button type="submit" color="primary" variant="contained" style={{ padding: '10px', float: 'right' }}>{buttonLabel}</Button>
                    </Paper>
                </div>
            </form>
        )
    }

    renderNoCommentsView = () => {
        return (
            <div>
                <List>
                    <ListItem>
                        <Typography style={{ fontStyle: 'italic' }}>No comments yet</Typography>
                    </ListItem>
                </List>
                {this.addAComment("Add a new comment")}
            </div>
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
                    {/* {this.renderDocumentContent()} */}
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
                                <Grid item xs={12} lg={2} md={2}>
                                    <Typography className={classes.textHeader}>
                                        No. of Comments
                                </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} md={2}>
                                    <Button color="primary" variant="outlined">
                                        Upload Interim Report
                                    </Button>
                                </Grid>
                            </Grid>
                            <hr style={{ width: '100%' }}></hr>
                            <Divider variant="middle" />
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
                            <Typography style={{ fontWeight: '600' }}>{this.state.noOfComments} comments on</Typography>
                        </ListItem>
                        <ListItem>
                            {/* Document name here */}
                            <Typography style={{ width: 320, wordWrap: 'break-word' }}>
                                {this.state.documentName}
                            </Typography>
                            {/* <ListItemText primary={"Document name here"} /> */}
                        </ListItem>
                    </List>
                    <Divider />
                    {this.state.noOfComments === 0 ?
                        this.renderNoCommentsView()
                        : this.renderCommentSection()}
                </Drawer>
            </div>
        )
    }
}

InterimReportContent = observer(InterimReportContent)
export default withStyles(useStyles)(InterimReportContent)