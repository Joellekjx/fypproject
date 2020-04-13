import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AddEventButton from './MainCalendarComponents/addEventButton';
import StudentSwipeableTemporaryDrawer from './studentComponents/studentSwipeableTemporaryDrawer';
import StaffSwipeableTemporaryDrawer from './staffComponents/staffSwipeableTemporaryDrawer';

class LeftSideColumn extends Component {
    render(){
        const { calendarStore, history, type } = this.props;
        return(
            <div className="LeftSideColumn" style={{paddingTop: '7px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        {type === 'Student' ?
                        <StudentSwipeableTemporaryDrawer history={history} /> :
                        <StaffSwipeableTemporaryDrawer history={history}/>
                        }
                    </Grid>
                    <Grid item xs={12} style={{paddingTop: '5px', borderTop: '1px solid #ddd'}}>
                        <AddEventButton calendarStore={calendarStore}/>
                    </Grid>
                </Grid>
                </div>
        )
    }
}

export default LeftSideColumn;