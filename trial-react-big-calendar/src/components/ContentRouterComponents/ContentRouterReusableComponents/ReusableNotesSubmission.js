import React, { Component } from 'react';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 * 
 * @props type Weekly Report or Meeting Notes?
 * @props onSubmitForm
 * @props handleChange
 * @props addAttachment
 * @props textfieldValue
 * @props textfieldName
 * @props buttonLabel
 * @props textfieldValue2
 * @props textfieldName2
 * @props onClickHandler
 * @props noOfRows
 */

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: 'bold'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
        padding: '5px 0px',
    },
    bodyText: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        padding: '5px 0px',
    },
    paper: {
        width: '80%',
        padding: '15px',
        marginTop: '15px',
    }
})

const ReusableNotesSubmission = (props) => {
    const { classes } = props;
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={props.onSubmitForm} method="POST">
                <Paper elevation={2} className={classes.paper}>
                    {props.type === 'Weekly Report' ?
                        <div style={{ display: 'flex' }}>
                            <Typography className={classes.secondaryHeading}>
                                Hours spent: &nbsp;
                  </Typography>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="number"
                                style={{ width: '12%' }}
                                value={props.textfieldValue2}
                                onChange={props.handleChange}
                                name={props.textfieldName2}
                            />
                        </div>
                        : ''
                    }
                    <TextField
                        variant="outlined"
                        multiline
                        rows={props.noOfRows}
                        style={{ width: '100%' }}
                        value={props.textfieldValue}
                        onChange={props.handleChange}
                        name={props.textfieldName}
                    />
                    <div style={{ padding: '10px 0px 5px 0px' }}>
                        <input type="file" name="file" onChange={props.addAttachment} />
                        <button type="button" className="btn btn-success btn-block" onClick={props.onClickHandler}>Upload</button>
                        {/* <Button onClick={this.addAttachment} style={{}}><strong>Add attachment</strong></Button> */}
                        <Button type="submit" color="primary" variant="contained" style={{ float: 'right' }}>{props.buttonLabel}</Button>
                    </div>
                </Paper>
            </form>
        </div>
    )
}

export default withStyles(useStyles)(ReusableNotesSubmission);