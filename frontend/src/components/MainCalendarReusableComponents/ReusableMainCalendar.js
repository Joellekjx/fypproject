import React, { Component } from "react";
import EventForm from '../MainCalendarComponents/eventForm';
import { withRouter } from "react-router-dom";
import '../styles.scss';
import { observer } from "mobx-react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@material-ui/core";
import CustomEventWithPopover from '../MainCalendarComponents/indivEvent';
import { withStyles } from '@material-ui/core/styles';
import StaffEventForm from '../staffComponents/staffEventForm'
import StaffDnDCalendar from '../staffComponents/staffDnDCalendar';
import StudentDnDCalendar from '../studentComponents/studentDnDCalendar';

/**
 * Note to self: Need to make "add event" onClick in Calendar to be bug free
 */


const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    dateHeaderStyle: {
        display: 'inline',
        fontFamily: 'Roboto',
        fontSize: '15px'
    }
});

class ReusableMainCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dayLayoutAlgorithm: 'no-overlap',
            isAddModalOpen: false,
            currentEvent: '',
        }
    }

    handleClose = () => {
        this.setState({ isAddModalOpen: false })
    }

    onEventResize = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })
    }

    renderEventMoreInfo = (event) => {
        const eventType = event.event_type;
        const { calendarStore } = this.props;
        const { addSelectedData, changeDefaultState } = calendarStore;

        addSelectedData({ //maybe need to remove liao since it doesn't seem to help v much lol
            Id: event.Id,
            title: event.title,
            start: event.start,
            end: event.end,
            event_type: event.event_type,
            status: event.status,
        });

        switch (eventType) {
            case "Weekly Report":
                changeDefaultState('Weekly Report');
                this.props.history.push('/contentrouter');
                break;
            case "Meeting Notes":
                changeDefaultState('Meetings');
                this.props.history.push('/contentrouter');
                break;
            default:
                return "Nothing";
        }
    }

    toggleAddModal = (event) => {
        this.setState({
            currentEvent: event,
            isAddModalOpen: !this.state.isAddModalOpen,
        })
    };

    renderDialog = () => {
        const { currentEvent } = this.state;
        const { calendarStore, type } = this.props;
        return (
            <React.Fragment>
                <Dialog open={this.state.isAddModalOpen} onClose={this.handleClose}>
                    {
                        type === "Student" ?
                            <EventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
                            :
                            <StaffEventForm calendarStore={calendarStore} start={currentEvent.start} end={currentEvent.end} handleClose={() => this.handleClose()} />
                    }
                </Dialog>
            </React.Fragment>
        )
    }

    render() {
        const { calendarStore, classes, type } = this.props;
        const { getData, getDataLength } = calendarStore; //why the fk is getDataLength affecting appearance??
        const { getStaffStudentFilteredData, getStaffStudentFilteredDataLength } = calendarStore;
        return (
            <div className="MainCalendar">
                {
                    type === "Student" ?
                        <StudentDnDCalendar
                            eventsData={getData}
                            onEventResize={this.onEventResize}
                            calendarStore={calendarStore}
                            toggleAddModal={this.toggleAddModal}
                            dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
                        />
                        :
                        <StaffDnDCalendar
                            eventsData={getStaffStudentFilteredData}
                            onEventResize={this.onEventResize}
                            calendarStore={calendarStore}
                            toggleAddModal={this.toggleAddModal}
                            dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
                        />
                }
                {this.renderDialog()}
            </div>
        )
    }
}

ReusableMainCalendar = observer(ReusableMainCalendar);
export default withRouter((withStyles(useStyles)(ReusableMainCalendar)));