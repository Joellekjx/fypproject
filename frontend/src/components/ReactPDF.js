import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Divider } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// This helps to format and display all PDFs:
export default class ReactPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            fileName: this.props.url
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages, fileName } = this.state;
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
            </div>
        );
    }
}