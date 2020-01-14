import React, {Component} from "react";
import { Grid } from "@material-ui/core";
import moment from 'moment';
import AddEventButton from './addEventButton';

class LeftSideColumn extends Component {
    constructor(props){
        super(props);
        this.state = {
            // semStart: "2020-01-13",
            // semEnd: "2020-03-12"
            semStart: moment("2020-01-13"),
            semEnd: moment("2020-04-17"),
        }
    }

    renderWeekCounter = () => {
        let { semStart, semEnd } = this.state;
        let difference = semEnd.diff(semStart, 'week');
        return(
            <div>
                Hello<br/>
                {difference}
            </div>
        )
    }

      consoleClick = () => {
          console.log("click");
      }

    render(){
        // const date = moment();
        // console.log(date);
        const { calendarStore } = this.props;
        return(
            <div className="LeftSideColumn">
                <Grid container>
                    <Grid item xs={6}>
                        <AddEventButton calendarStore={calendarStore}/>
                    </Grid>
                    <Grid item xs={6}>
                        Week counter
                        {this.renderWeekCounter()}
                    </Grid>
                </Grid>
                </div>
        )
    }
}

export default LeftSideColumn;