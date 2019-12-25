import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import { Grid, Button } from '@material-ui/core';
// @import '../../node_modules/@syncfusion/ej2/material.css';
// import * as ReactDOM from 'react-dom';
// import { ScheduleComponent, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
// import { appData } from './datasource';
// import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
// import { DataManager, ODataV4Adaptor, UrlAdaptor } from '@syncfusion/ej2-data';
// import { Ajax } from '@syncfusion/ej2-base';
import axios from 'axios';

class MainContent extends React.Component{
    //Leave this blank first
    // state = {
    //     task: [],
    //     data = [
            
    //     ]
    // }
    constructor(props) {
        super(props);
        // super(...arguments);
        this.state = {
            task: [],
            data: [{ //format: Id {task_id}, Subject {task_type}, StartTime, EndTime
                Id: 1,
                Subject: 'Hello',
                StartTime: new Date(2020, 1, 13, 9, 30),
                EndTime: new Date(2020, 1, 15, 11, 0)
            }, {
                Id: 2,
                Subject: 'What',
                StartTime: new Date(2020, 1, 12, 9, 30),
                EndTime: new Date(2020, 1, 12, 12, 0)
            }
        ]
        }
        // this.dataManager = new DataManager({
        //     url: 'http://127.0.0.1:8000/api/task/',
        //     adaptor: new ODataV4Adaptor
        // });
        // this.dataQuery = new Query().from("Events");
    //     this.data = [
    //     {
    //         Id: 1,
    //         Subject: 'Hello',
    //         StartTime: new Date(2020, 1, 15, 9, 30),
    //         EndTime: new Date(2020, 1, 15, 11, 0)
    //     }, {
    //         Id: 2,
    //         Subject: 'What',
    //         StartTime: new Date(2020, 1, 15, 9, 30),
    //         EndTime: new Date(2020, 2, 15, 12, 0)
    //     }
    // ];
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/task/')
            .then(res => {
                this.setState({
                    task: res.data
                })
                console.log(res.data);
                // console.log(this.state.task);
                this.pushDataIntoData();
            })
        
    }

    

    // constructor() {
    //     super(...arguments);
    //     this.data = extend([], appData, null, true);
    // }

    pushDataIntoData = () => {
        // console.log(this.state.data);
        let key = 0;
        var stateCopy = Object.assign({}, this.state); //copies this.state entirely
        stateCopy.data = stateCopy.data.slice();
        stateCopy.data[key] = Object.assign({}, stateCopy.data[key]); //copies this.state.data[key] into stateCopy.data[key]
        let newState = this.state.task[key].task_type; //try and update the Subject as "task_type"
        stateCopy.data[key].Subject = newState;
        this.setState(stateCopy);
    }
    
    renderMainCalendar() {
        // this.pushDataIntoData();
        return(
            <ScheduleComponent selectedDate={new Date(2020, 1, 15)} eventSettings={{ dataSource: this.state.data }}>
                <ViewsDirective>
                    <ViewDirective option='Month' showWeekend={false} isSelected/>
                    <ViewDirective option='Week' showWeekend={false}/>
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
};
// class MainContent extends React.Component {
//     constructor() {
//         super(...arguments);
//         this.dataManager = new DataManager({
//             url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
//             adaptor: new ODataV4Adaptor
//         });
//         this.dataQuery = new Query().from("Events");
//     }
//     render() {
//         return <ScheduleComponent height='550px' selectedDate={new Date(2017, 5, 11)} readonly={true} eventSettings={{ dataSource: this.dataManager, query: this.dataQuery }}>
//       <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
//     </ScheduleComponent>;
//     }
// }
// ;

export default MainContent;