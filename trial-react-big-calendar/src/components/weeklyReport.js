import axios from 'axios';
import React, {Component} from 'react';

class WeeklyReport extends Component {

    constructor(props){
        super(props)
        this.state = {
          task: [],
        }
    };  

    componentDidMount(){
        const { calendarStore } = this.props;
        const { addData, getData } = calendarStore;
        // need to write some codes to get the student id to filter further
        axios.get('http://127.0.0.1:8000/api/task/?task_type=weekly report&student_id=2' )
            .then(res => {
                console.log(res);
                res.data.map(indivRes => {
                  this.setState(prevState => ({
                    task:[...prevState.task, indivRes]
                  }))
                  var start = new Date(indivRes.task_due_date);
                  var starttime = new Date(start.setHours(0, 0, 0, 0));
                  var end = new Date(indivRes.task_due_date);
                  
                  if(getData.length != res.data.length) {
                    addData({Id: indivRes.task_id, title: indivRes.task_type, start: starttime, end: end, event_type: indivRes.task_type})
                  }
                })
            })
    }

    render(){
        return(
            <div>
                Hello Weekly Report
            </div>
        )
    }
}

export default WeeklyReport;
