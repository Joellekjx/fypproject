import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import axiosPostComment from '../AxiosCalling/axiosPostComment';
import moment from 'moment';

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
    fontWeight: 'bold'
  },
  bodyText: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: '15px',
    marginTop: '15px',
    minHeight: '200px',
  }
})

class WeeklyReportCommentBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: "",
      buttonLabelState: "Add a new comment",
      dataArray: this.props.calendarStore.getData
    }
  }

  updateCalendarStore = () => {
    const { dataArray, comment } = this.state;
    const { calendarStore, id } = this.props;
    const { getData } = calendarStore;
    /**
     * Thoughts on how to update:
     * 1. Find the id (task_id, specifically) of the main object
     * 2. Inside that id, find the "comments" array
     * 3. .push (?) into that comments with the 4 items: id, user_id, comment, creation_date
     * 4. Pray that it reflects
     */
    // this.setState({ dataArray: getData }); //copy over first? then mutate data then send to calendarstore?
    console.log(dataArray)
    console.log("data array up here")
    const index = this.state.dataArray.findIndex(datum => datum.Id === id)
    console.log(index);
    console.log('index above in updatestore');
    dataArray[index].comments.push({task_id: id, user_id: 1, creation_date: moment(new Date()),content: comment})
    this.setState({dataArray});
  }

  clearCommentBox = () => {
    this.setState({comment: ""})
  }
  
  onSubmitComment = (e) => {
    e.preventDefault();
    const { comment, buttonLabelState } = this.state;
    const { id, user_id } = this.props;
    var creation_date = moment()
    //bruh: u need to be able to determine if the user is student or tutor -- next time when logging in is available
    if(comment==="") {
      alert("Please fill in a comment before submitting");
    } else {
      axiosPostComment(id, user_id, comment, creation_date);

      //Update calendar store so that comment will be reflected
      this.updateCalendarStore();

      //clear comment box:
      this.clearCommentBox();
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  addAComment = (buttonLabel) => {
    const { comment } = this.state;
    const { classes } = this.props;
    return(
      <form noValidate autoComplete="off" onSubmit={this.onSubmitComment} method="POST">
        <div>
          <Paper elevation={2} style={{width: '70%'}} className={classes.paper}>
            <TextField 
              multiline
              rows="5"
              style={{
                width: '100%'
              }}
              value={comment}
              onChange={this.handleChange}
              name="comment"
              placeholder="Type in your comments"
              // value={value}
              // onChange={handleChange}
            ></TextField>
            <br/><br/>
            <Button type="submit" color="primary" variant="contained" style={{padding: '10px', float: 'right'}}>{buttonLabel}</Button>
          </Paper>
        </div>
      </form>
    )
  }

  renderNoCommentsView = () => {
    return(
      <div>
        No comments yet. <br/>
        {this.addAComment("Add a new comment")}
      </div>
    )
  }

  renderCommentsView = () => {
    const { comments, classes } = this.props;
    return(
      <div>
        {comments.map((data, index) => {
          return(
            <div key={index} style={{padding: '7px'}}>
              <div style={{display: 'flex'}}>
                {/* Note to self: Please do not force the user_id to have a name. Once a username can be introduced, pls change the codes */}
                <Typography className={classes.secondaryHeading}>{data.user_id === 1 ? "Student" : "Professor"}&nbsp;</Typography>
                <Typography className={classes.bodyText}>commented on {moment(data.creation_date).format('LLL')}</Typography>
              </div>
              <div style={{padding: '5px 0px 0px 5px', height: '100%', display: 'flex'}}>
                <div style={{borderLeft: '2px solid lightgrey', minHeight: '100%', marginRight: '10px'}}></div>
                <Typography className={classes.bodyText}>{data.content}</Typography>
              </div>
            </div>
          )
        })}
        {this.addAComment("Reply")}
      </div>
    )
  }
  
  render(){
    const { classes, comments } = this.props;
    return(
    <div style={{width: '100%'}}>
      <Typography className={classes.heading}>Comments:</Typography>
      {comments.length === 0 ? this.renderNoCommentsView() : this.renderCommentsView()}
    </div>
    )
  }
} 

WeeklyReportCommentBox = observer(WeeklyReportCommentBox);
export default withStyles(useStyles)(WeeklyReportCommentBox);
