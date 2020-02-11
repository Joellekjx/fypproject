/**
 * Note: This is an experimental getter
 * Aim: Combine data from ../api/task and ../api/comment together
 * So that multiple comments can be chained to the same data by Id
 */

 import axios from 'axios';

 export default function axiosGetCombinedData(calendarStore){
    //  var totalHours = 0;
     axios.all([
            axios.get('http://127.0.0.1:8000/api/task/'),
            axios.get('http://127.0.0.1:8000/api/comment/')
     ])
            // .then(axios.spread((firstResponse, secondResponse) => {
            //     console.log("HELLOOOOO")
            //     console.log(firstResponse.data, secondResponse.data);
            //     // console.log(secondResponse.data);
            //     firstResponse.data.map(indivRes => console.log(indivRes))
            // }))
        .then(axios.spread(function (tasks, comments) {
            // var combined = 
            // tasks.data.map((result, source) => {
            //     console.log(source);
            //     console.log(result)
            // })
            // tasks.data.map((task, index) => {
            //     calendarStore.axiosGetCombinedData({
            //         Id: task.task_id,
            //         title: task.task_type,
            //         comments: [{
                        
            //         }]
            //     })
            // })
            // calendarStore.setCombinedData({
            //     Id: 
            // })
            
        }))
        .catch(error => console.log(error.response))
 }