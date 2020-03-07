import axios from 'axios';

//axios post creates a new task
/**
 * For axiosPost, if "weekly report", taskCreatedDate === taskDueDate
 * Else if "meetings", taskCreatedDate = start timing of meeting and end timing
 */
export default function axiosGetPDF(id) {
    axios('http://127.0.0.1:8000/api/document/'+id+'/', { //try to get the document from task_attach_document_id = 4
        method: 'GET',
        responseType: 'blob' //force to receive data in a blob format
    })
    .then(response => {
        //is it possible to get more than one?
        console.log(response);
        console.log('this is the response from document')
        const file = new Blob(
            [response.data],
            {
                type: 'application/pdf'
            }
        );

        console.log(file)
        console.log('what is this file inside axios get pdf?')
        //build a url from the file
        const fileURL = URL.createObjectURL(file)
        console.log(fileURL)
        console.log('and what is the fileurl here?')

        window.open(fileURL);
    })
    .catch(error => {
        console.log(error)
    })
}

