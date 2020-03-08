import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axiosGetPDF from './AxiosCalling/axiosGetPDF';
import anotherTestDocument from '../static/another-kind-of-test-document.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class ReactPDF extends Component {
    componentDidMount() {
        const { calendarStore } = this.props;
        axiosGetPDF({calendarStore: calendarStore, id: 4})
    }

    constructor(props){
        super(props);
        this.state = {
            numPages: null, 
            pageNumber: 1, 
            // fileName: '/another-kind-of-test-document.pdf',
            fileName: anotherTestDocument
        }
    }

    // state = { numPages: null, pageNumber: 1, fileName: '/another-kind-of-test-document.pdf' };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    openPdfById = () => {
        const { calendarStore } = this.props;
        // axiosGetPDF({calendarStore: calendarStore, id: 4})
        console.log(calendarStore.getFileURL)
        this.setState({ fileName: calendarStore.getFileURL })
        // window.open(calendarStore.getFileURL);
    }

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages, fileName } = this.state;

        return (
            <div>
                <nav>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>

                <div style={{ width: 600 }}>
                    <Document
                        file={fileName}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} width={600} />
                    </Document>
                </div>

                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <button onClick={this.openPdfById}>
                    Open PDF in Id = 4
                </button>
            </div>
        );
    }
}
// export default class ReactPDF extends Component {
//     state = {
//       numPages: null,
//       pageNumber: 1
//     };

//     onDocumentLoadSuccess = ({ numPages }) => {
//       this.setState({ numPages });
//     };

//     render() {
//       const { pageNumber, numPages } = this.state;

//       return (
//         <div>
//           <Document
//             file="https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf"
//             onLoadSuccess={this.onDocumentLoadSuccess}
//           >
//             <Page pageNumber={pageNumber} />
//           </Document>
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//         </div>
//       );
//     }
//   }
