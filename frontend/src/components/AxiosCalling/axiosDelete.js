import axios from 'axios';

//axios delete -- this deletes the ENTIRE thing, nothing is saved
export default function axiosDelete(Id){
    axios.delete(`http://127.0.0.1:8000/api/taskComment/${Id}/`, {})
    .then(response=>{
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    })
}

