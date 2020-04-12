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

import Button from '@material-ui/core/Button';

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
})

class ProjectListing extends Component {
    constructor(props){
        super(props);
    }  

    handleLogout = (e) => {
    //   e.preventDefault();
      this.props.logout();
    }

    
    handleClick = (e) => {
        const value = e.target.value;
        
    }

    render() {
        const { classes } = this.props;

        if (this.props.token != null) {
            console.log('**********');
            console.log(this.props.user);
            console.log(this.props.projects);
            console.log('**********');
            
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
                                    <ListItem button key={item.id} onClick={this.handleClick()} value={item.id}>
                                        <ListItemText primary={item.first_name + item.last_name} />
                                    </ListItem>
                                )}
                                </List>
                             </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                    <form className={classes.form} noValidate onSubmit={this.handleLogout} method="POST">
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Logout
                        </Button>
                    </form>
                </div>
            );
        } else {

            return (
                <div>
                    No projects available
                    <form className={classes.form} noValidate onSubmit={this.handleLogout} method="POST">
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Logout
                        </Button>
                    </form>
                </div>
                
                
            );
        }
        
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token,
        user: state.user,
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        logout: () => dispatch(actions.logout())
    }
}

const ProjectListingForm = withStyles(useStyles)(ProjectListing);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListingForm);