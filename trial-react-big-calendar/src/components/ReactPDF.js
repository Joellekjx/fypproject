import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axiosGetPDF from './AxiosCalling/axiosGetPDF';
import anotherTestDocument from '../static/another-kind-of-test-document.pdf';
import { Divider } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// This helps to format and display all PDFs:
export default class ReactPDF extends Component {
    componentDidMount() {
        const { calendarStore } = this.props;
        // axiosGetPDF({calendarStore: calendarStore, id: 4}) //this tests out pdf
        //this tests out docx:
        // axiosGetPDF({ calendarStore: calendarStore, id: 5 })
        //note: a docx will not be displayed and can only be downloaded (but only through window.open)
    }

    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            // fileName: '/another-kind-of-test-document.pdf',
            // fileName: anotherTestDocument
            fileName: this.props.url
        }
    }

    // state = { numPages: null, pageNumber: 1, fileName: '/another-kind-of-test-document.pdf' };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    // openPdfById = () => {
    //     const { calendarStore } = this.props;
    //     // axiosGetPDF({calendarStore: calendarStore, id: 4})
    //     console.log(calendarStore.getFileURL)
    //     this.setState({ fileName: calendarStore.getFileURL })
    //     // window.open(calendarStore.getFileURL);
    // }

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages, fileName } = this.state;
        const { calendarStore } = this.props;
        return (
            <div style={{ width: 500, height: 600 }}>
                <nav style={{ float: 'right' }}>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <Divider />
                <div style={{ width: 500 }}>
                    <Document
                        file={fileName}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} width={500} />
                    </Document>
                </div>
                <Divider />

                {/* <button onClick={this.openPdfById}>
                    Open PDF in Id = 4
                </button> */}
                {/* <iframe src={calendarStore.getFileURL} width='1366px' height='623px' frameborder='0'></iframe> */}
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
