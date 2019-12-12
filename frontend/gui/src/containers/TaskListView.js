import React from 'react';
import axios from 'axios';
import Task from '../components/Task'

class TaskList extends React.Component {

    state = {
        task: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/task/')
            .then(res => {
                this.setState({
                    task: res.data
                })
                console.log(res.data);
            })
    }


    render() {
        return (
            <Task data={this.state.task}/>
        )
    }
}

export default TaskList;