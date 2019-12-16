import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import { Grid, Button } from '@material-ui/core';
// @import '../../node_modules/@syncfusion/ej2/material.css';
// import * as ReactDOM from 'react-dom';
// import { ScheduleComponent, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
// import { appData } from './datasource';
// import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

class MainContent extends React.Component {
    //Leave this blank first
    // state = {

    // }

    //Leave this blank first
    // constructor(props){

    // }
    // constructor() {
    //     super(...arguments);
    //     this.data = extend([], appData, null, true);
    // }
    
    renderMainCalendar() {
        return(
            <ScheduleComponent>
                <ViewsDirective>
                    <ViewDirective option='Week' showWeekend={false}/>
                    <ViewDirective option='Month' showWeekend={false}/>
                </ViewsDirective>
                <Inject services={[Month, Week]}/>
            </ScheduleComponent>
        )
    }

    render(){
        return(
            <div>
                <Grid container>
                    <Grid item xs={2}>
                    {/* Left-side bar */}
                        {/* Add event button */}
                        <Button variant="contained">+ Add Event</Button>
                    </Grid>
                    <Grid item xs={10}>
                        {this.renderMainCalendar()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MainContent;