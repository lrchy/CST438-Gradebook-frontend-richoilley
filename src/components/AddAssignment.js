import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { SERVER_URL } from '../constants';

function AddAssignment(props) {
  //define state variables
  const [open, setOpen] = useState(true); // To control the dialog's open/close state
  const [assignmentName, setAssignmentName] = useState('');
  const [courseId, setCourse_id] = useState('');
  const [dueDate, setDueDate] = useState('');
  const token = sessionStorage.getItem("jwt");

//function to close the dialog and navigate back to previous page
  const handleClose = () => {
    setOpen(false);
    props.history.goBack();
  };

  //handles the submission of a new assignment
  const handleSubmit = () => {
    //construct a new assignment object
    const newAssignment = {
      assignmentName: assignmentName,
      courseId: courseId,
      dueDate: dueDate
    };

      //send the new assignment data to the server with POST
    fetch(`${SERVER_URL}/assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':token
      },
      body: JSON.stringify(newAssignment)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error");
        }
        return response.json();
      })
      .then(data => {
        //if the server returns a successful response, close the dialog
        handleClose();
      })
      .catch(error => {
        //log any errors
        console.error("Error:", error.message);
      });
  };

  //dialog component :
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Assignment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Assignment Name"
          type="text"
          fullWidth
          value={assignmentName}
          onChange={e => setAssignmentName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="courseId"
          label="Course ID"
          type="int"
          fullWidth
          value={courseId}
          onChange={e => setCourse_id(e.target.value)}
        />
        <TextField
          margin="dense"
          id="dueDate"
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button id="submit" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAssignment;