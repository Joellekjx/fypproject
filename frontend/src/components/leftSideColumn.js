import React, { Component } from "react";
import { Grid, Checkbox, Typography } from "@material-ui/core";
import AddEventButton from './MainCalendarComponents/addEventButton';
import { observer } from "mobx-react";
// import Checkbox from './staffComponents/Checkbox';
import ReusableSwipeableTemporaryDrawer from './MainCalendarReusableComponents/ReusableSwipeableTemporaryDrawer';

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
    }

    handleChange = (e) => {
        const key = e.target.value;
        const { calendarStore } = this.props;
        const { filterStaffStudentData } = calendarStore;
        filterStaffStudentData(key)
    }

    renderOptionsButtonForStaff = () => {
        const { classes } = this.props;
        return (
            <div>
                <Typography style={{ fontWeight: 'bold' }}>Filter by projects:</Typography>
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
        const { calendarStore, type } = this.props;
        return (
            <div className="LeftSideColumn">
                <Grid container>
                    <Grid item xs={12}>
                        {type === 'Student' ?
                            <ReusableSwipeableTemporaryDrawer type="Student" calendarStore={calendarStore} />
                            :
                            <ReusableSwipeableTemporaryDrawer type="Staff" calendarStore={calendarStore} />
                        }
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: '5px', borderTop: '1px solid #ddd' }}>
                        <AddEventButton calendarStore={calendarStore} type={type} />
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