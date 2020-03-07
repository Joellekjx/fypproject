import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axiosGetPDF from './AxiosCalling/axiosGetPDF';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class ReactPDF extends Component {
    // componentDidMount() {
    //     axiosGetPDF()
    // }

    state = { numPages: null, pageNumber: 1 };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    openPdfById = () => {
        axiosGetPDF(4)
    }

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                <nav>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>

                <div style={{ width: 600 }}>
                    <Document
                        file="/another-kind-of-test-document.pdf"
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
