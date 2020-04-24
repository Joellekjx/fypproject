import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Typography, Grid } from '@material-ui/core';
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

    handleDrawerOpen = (documentName, noOfComments) => {
        this.setState({ open: true, documentName: documentName, noOfComments: noOfComments })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    renderDocumentContent = () => {
        const { calendarStore } = this.props;
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
                                <Grid item container>
                                    <Grid item xs={12} lg={6} md={6}>
                                        <Typography>
                                            {documentName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={2} md={2}>
                                        <Typography>
                                            {moment(document.uploaded_date).format('LLL')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={2} md={2} >
                                        <Typography onClick={() => this.handleDrawerOpen(documentName, noOfComments)}>
                                            {text.comments.length === 0 ?
                                                "0 Comments" :
                                                `${text.comments.length} Comments`
                                            }
                                            {/* No. of Comments */}
                                        </Typography>
                                    </Grid>
                                </Grid>
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
                                <Grid item xs={12} lg={6} md={6}>
                                    <Typography style={{lineHeight: '36px'}}>
                                        File Name
                                </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} md={2}>
                                    <Typography style={{lineHeight: '36px'}}>
                                        Uploaded Date
                                </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} md={2}>
                                    <Typography style={{lineHeight: '36px'}}>
                                        No. of Comments
                                </Typography>
                                </Grid>
                                <Grid item xs={12} lg={2} md={2}>
                                    <Button color="primary">
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
                        <List><ListItem><Typography style={{ fontStyle: 'italic' }}>No comments yet</Typography></ListItem></List>
                        : this.renderCommentSection()}
                </Drawer>
            </div>
        )
    }
}

InterimReportContent = observer(InterimReportContent)
export default withStyles(useStyles)(InterimReportContent)