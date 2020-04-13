import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';
import * as actions from '../login-store/actions/auth';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    appbarroot: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})

class ProjectListing extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = () => {
        this.props.logout();
    }

    handleClickUser = (e, index) => {
        //Can be used to route to staff's main calendar, then it filters itself
        const value = index;
        console.log(value);
        e.preventDefault();
        this.props.setParam(value, null);
        this.props.history.push('/');
    }

    renderAppBar = () => {
        const { classes } = this.props;
        return (
            <div className={classes.appbarroot}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Hi, {this.props.user.username}
                  </Typography>
                        <Button
                            type="submit"
                            style={{ color: 'white' }}
                            onClick={() => this.handleLogout()}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    renderProjectPanels = () => {
        // const handleClick = (e, index) => {

        // };
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                {this.props.projects.map((item, key) =>
                    <ExpansionPanel key={item.project_id} >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{item.project_name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {/* {item.student} */}
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                // subheader={
                                //     <ListSubheader component="div" id="nested-list-subheader">
                                //     Nested List Items
                                //     </ListSubheader>
                                // }
                                className={classes.root}
                            >
                                {item.students.map((item, key) =>
                                    <ListItem button key={item.id}
                                        onClick={(event) => this.handleClickUser(event, item.id)}>
                                        <ListItemText primary={item.first_name + item.last_name} />
                                    </ListItem>
                                )}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </div>
        )
    }

    renderNoProjectAvailable = () => {
        const { classes } = this.props;
        return (
            <div>
                No projects available
            </div>
        )
    }


    render() {
        const { classes } = this.props;

        if (this.props.token != null) {
            console.log('**********');
            console.log(this.props.user);
            console.log(this.props.projects);
            console.log(this.props.paramQuery);
            console.log('**********');
            return (
                <div>
                    {this.renderAppBar()}
                    {this.renderProjectPanels()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderAppBar()}
                    {this.renderNoProjectAvailable()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token,
        user: state.user,
        projects: state.projects,
        paramQuery: state.paramQuery
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setParam: (student_id, project_id) => dispatch(actions.addTasklistParams(student_id, project_id)),
        logout: () => dispatch(actions.logout())
    }
}

const ProjectListingForm = withStyles(useStyles)(ProjectListing);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListingForm);