import axios from 'axios';

export default function axiosGetPDF({calendarStore, id}) {
    axios('http://127.0.0.1:8000/api/document/' + id + '/', { 
        method: 'GET',
    })
        .then(response => {
            calendarStore.setFileURL(response.data.attach_document)
        })
        .catch(error => {
            console.log(error)
        })
}

