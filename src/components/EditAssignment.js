import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function EditAssignment(props) { 
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  //we store courseId because of backend logic 
  //otherwise it updates the assignment with a null id and returns an error
  const [courseId, setCourseId] = useState('');
  
  //get assignment id from the URL using the react router's useParam
  const {id} = useParams();

  //this is for the back button logic
  const history=useHistory();
  const token = sessionsStorage.getItem("jwt");

  //fetch assignment details when components mounts or when id changes
  useEffect(() => {
    fetch(`${SERVER_URL}/assignment/${id}`, {
      headers: {
        'Authorization':token
      }
    })
      .then(response=>response.json())
      .then(data=>{
      setAssignmentName(data.assignmentName);
      setDueDate(data.dueDate);
      setCourseId(data.courseId);
      })
      .catch(error=> console.error('Error:',error))
  }, [id]) //useEffect dependency array

  //handles submission when update button is clicked after filling the form
  const handleSubmit=() => {
    const updatedAssignment={
      assignmentName:assignmentName,
      dueDate:dueDate,
      courseId: courseId
    } 

    //logic for the PUT request ; send the updated assignment data to the server
    fetch(`${SERVER_URL}/assignment/${id}`,{
      method:'PUT',
      headers : {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body:JSON.stringify(updatedAssignment),
    })
    .then(response =>{
      if (response.ok){
        //navigate to assignment list
        props.history.push('/listAssignment');
      }
      else {
        console.error('Error updating the assignment');
      }
    })
    .catch(error => console.error('Network error:',error));
  }

  const handleBackClick= () =>{
    history.push('/'); //to navigate back to the main page on click
  }

  
  return (
      <div>
        <h3>Edit Assignment</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Assignment Name</label>
            <input 
              type='text'
              id='updatedName'
              value={assignmentName}
              onChange={e => setAssignmentName(e.target.value)}
            />
          </div>
          <div>
            <label>New Due Date</label>
            <input 
              type='date'
              id='updatedDate'
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
          <button id='update' type="submit">Update</button>
        </form>
        <button id='backToList' onClick={handleBackClick}>Back</button>
      </div>
  ); 
}

export default EditAssignment;