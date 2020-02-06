import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import axiosGetComment from '../AxiosCalling/axiosGetComment';
import axiosPostComment from '../AxiosCalling/axiosPostComment';
// import axiosPost from '../AxiosCalling/axiosPost';
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
    // width: '80%',
    padding: '15px',
    marginTop: '15px',
    // height: 'auto',
    minHeight: '200px',
  }
})

class WeeklyReportCommentBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      // weeklyReportArray: [],
      comment: "",
      buttonLabelState: "Add a new comment",
    }
  }

  componentDidMount(){
    const { calendarStore } = this.props;
    // if(calendarStore.getComments.length===0){
      // axiosGetComment(calendarStore);
    // }
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
      //if post successful then change reply state
      //this.setState({buttonLabelState: 'Reply'})
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  addAComment = () => {
    const { comment, buttonLabelState } = this.state;
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
            <Button type="submit" color="primary" variant="contained" style={{padding: '10px', float: 'right'}}>{buttonLabelState}</Button>
          </Paper>
        </div>
      </form>
    )
  }

  renderNoCommentsView = () => {
    return(
      <div>
        No comments yet. <br/>
        {this.addAComment()}
        {/* <Button onClick={this.addAComment()}>Add a comment</Button> */}
      </div>
    )
  }
  
  render(){
    const { classes } = this.props;
    return(
    <div style={{width: '100%'}}>
      <Typography className={classes.heading}>Comments:</Typography>
      {this.renderNoCommentsView()}
    </div>
    )
  }
} 

WeeklyReportCommentBox = observer(WeeklyReportCommentBox);
export default withStyles(useStyles)(WeeklyReportCommentBox);
