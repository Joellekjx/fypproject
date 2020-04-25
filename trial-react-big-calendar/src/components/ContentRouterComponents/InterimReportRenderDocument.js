import React, { Component } from 'react';
import RenderDocumentPreview from './renderDocumentPreview';
import { Typography, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = (theme) => ({
    fileHeader: {
        fontWeight: '500',
        lineHeight: '36px'
    }
});

class InterimReportRenderDocument extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, uploaded_date, document, index } = this.props;
        return (
            <React.Fragment key={index}>
                <Grid item container>
                    <Grid item xs={12} lg={5} md={5}>
                        <RenderDocumentPreview document={document} key={index} />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3}>
                        <Typography className={classes.fileHeader}>
                            {moment(uploaded_date).format('LLL')}
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

// InterimReportRenderDocument = 
export default withStyles(useStyles)(InterimReportRenderDocument)