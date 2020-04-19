import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import * as actions from '../../login-store/actions/auth';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

/**
 * 
 * @props {type} : Student or Staff? 
 */

function ReusableSwipeableTemporaryDrawer({ calendarStore, history, logout, type }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
        // currentPageEvent: '',
        // selectedIndex: 0
    });
    const [currentPageEvent, setCurrentPageEvent] = React.useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    // let history = useHistory()

    const toggleDrawer = (side, open) => (event) => {
        setState({ ...state, [side]: open })
    }

    const handleLogout = (e) => {
        logout()
    }

    const seeProjectListings = () => {
        //note: need to double check and make sure only admin sees this!!
        history.push('/staff/projectlistings')
    }

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {
                type === 'Staff' ?
                    <React.Fragment>
                        <List>
                            <ListItem button key="projectlistings" onClick={() => seeProjectListings()} >
                                <ListItemText>Project Listings</ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                    </React.Fragment>
                    : ""
            }
            {
                type === 'Student' ?
                    <React.Fragment>
                        <List>
                            {['Weekly Report', 'Meetings', 'Strategy Plan', 'Interim Report', 'Final Report'].map((text, index) => (
                                <ListItem button key={text} onClick={() => onClickHandler(text, index)}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </React.Fragment>
                    : ''
            }
            <List>
                <ListItem button key="Logout" onClick={() => handleLogout()}>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    const onClickHandler = (text, index) => {
        setSelectedIndex(index)
        setCurrentPageEvent(text)
    }

    const renderSwitchCase = () => {
        var user_id = calendarStore.getUserData.id
        switch (currentPageEvent) {
            case 'Meetings':
            case 'Weekly Report':
            case 'Strategy Plan':
            case 'Interim Report':
            case 'Final Report':
                return history.push({ path: `/${user_id}/content` })
            default:
                return "";
        }
    }

    return (
        <div style={{ float: 'center', textAlign: 'center', paddingBottom: '5px' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReusableSwipeableTemporaryDrawer)