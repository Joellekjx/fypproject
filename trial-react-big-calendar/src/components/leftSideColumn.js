import React, { Component } from "react";
import { Grid, Checkbox, Typography } from "@material-ui/core";
import AddEventButton from './MainCalendarComponents/addEventButton';
import StudentSwipeableTemporaryDrawer from './studentComponents/studentSwipeableTemporaryDrawer';
import StaffSwipeableTemporaryDrawer from './staffComponents/staffSwipeableTemporaryDrawer';
import { observer } from "mobx-react";
// import Checkbox from './staffComponents/Checkbox';

import { withStyles } from '@material-ui/core/styles';
const useStyles = (theme) => ({
    label: {
        display: 'inline',
        fontFamily: 'Roboto',
        fontSize: '15px'
    },
    square: {
        background: 'red',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        // width: 50vw;
        // height: 50vw;
    }
});

class LeftSideColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // checkedItems: new Map(),
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        console.log('inside handlechange')
        const item = e.target.name;
        const isChecked = e.target.checked;
        const key = e.target.value;
        // console.log(item)
        // console.log(isChecked)
        console.log(key)
        const { calendarStore } = this.props;
        const { filterStaffStudentData } = calendarStore;
        filterStaffStudentData(key)
        // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    renderOptionsButtonForStaff = () => {
        const { classes } = this.props;
        return (
            <div>
                <Typography>Filter by projects:</Typography>
                {this.props.calendarStore.getCheckboxes.map(item => (
                    <React.Fragment
                        key={item.key}>
                        <Checkbox
                            value={item.key}
                            defaultChecked
                            name={item.name}
                            onChange={(e) => this.handleChange(e)}
                            size="small"
                            style={{ color: item.color }}
                        />
                        <Typography className={classes.label}> {item.label}</Typography><br />
                    </React.Fragment>
                ))}
            </div>
        )

        // )
    }

    render() {
        const { calendarStore, history, type } = this.props;
        return (
            <div className="LeftSideColumn" style={{ paddingTop: '7px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        {type === 'Student' ?
                            <StudentSwipeableTemporaryDrawer history={history} calendarStore={calendarStore} /> :
                            <StaffSwipeableTemporaryDrawer history={history} calendarStore={calendarStore} />
                        }
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: '5px', borderTop: '1px solid #ddd' }}>
                        <AddEventButton calendarStore={calendarStore} />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: '5px' }}>
                        {type === 'Student' ?
                            "" :
                            this.renderOptionsButtonForStaff()
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

LeftSideColumn = observer(LeftSideColumn);
export default withStyles(useStyles)(LeftSideColumn);