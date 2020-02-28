import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AddEventButton from './MainCalendarComponents/addEventButton';
import SwipeableDrawer from './LeftSideColumnComponents/SwipeableDrawer';

class LeftSideColumn extends Component {
    render(){
        const { calendarStore, history } = this.props;
        return(
            <div className="LeftSideColumn" style={{paddingTop: '7px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <SwipeableDrawer history={history} />
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