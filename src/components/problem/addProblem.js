import React, { useState } from 'react'
import { withFirebase } from '../firebase'
import { Button } from 'react-bootstrap'
import { withAuthentication, AuthUserContext } from '../session'

const AddProblem = props => {
  const [pid, setPID] = useState(null)
  const [pname, setPname] = useState(null)
  const [ptags, setPtags] = useState(null)
  return(
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
        <form>
          <label>Problem ID:</label><br />
          <input type="text" id="id" name="id" value= {pid} onChange = {event => setPID(event.target.value)} /><br />
          <label>Problem name:</label><br />
          <input type="text" id="name" name="name" value= {pname} onChange = {event => setPname(event.target.value)} /><br />
          <label>Problem tags:</label><br />
          <input type="text" id="tags" name="tags" value= {ptags} onChange = {event => setPtags(event.target.value)} /><br />
          <Button variant = "dark" onClick = {() => {
            let role = "member"
            props.firebase.user(authUser.uid).on("value", snapshot => {
              role = snapshot.val().role || "member"
              if(role !== "admin")  return;
              props.firebase.problem(pid)
                .set({
                  id: pid,
                  name: pname,
                  solved: 0,
                  tags: ptags.split(',')
                })
                .then(() => console.log("Added"))
            })
          }}>Add problem</Button>
        </form>
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

export default withAuthentication(withFirebase(AddProblem))