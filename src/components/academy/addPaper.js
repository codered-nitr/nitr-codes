import React, { useState } from 'react'
import { withFirebase } from '../firebase'
import { Button } from 'react-bootstrap'
import { withAuthentication, AuthUserContext } from '../session'

const AddPaper = props => {
  const [pid, setPID] = useState(null)
  const [pname, setPname] = useState(null)
  const [pdesc, setPdesc] = useState(null)
  const [pt, setPt] = useState(null)
  return(
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
        <form>
          <label>Paper ID:</label><br />
          <input type="text" id="id" name="id" value= {pid} onChange = {event => setPID(event.target.value)} /><br />
          <label>Paper name:</label><br />
          <input type="text" id="name" name="name" value= {pname} onChange = {event => setPname(event.target.value)} /><br />
          <label>Paper description:</label><br />
          <input type="text" id="description" name="tags" value= {pdesc} onChange = {event => setPdesc(event.target.value)} /><br />
          <label>Paper type:</label><br />
          <input type="text" id="type" name="tags" value= {pt} placeholder = "articles/editorials" onChange = {event => setPt(event.target.value)} /><br />
          <Button variant = "dark" onClick = {() => {
            let role = "user"
            props.firebase.user(authUser.uid).on("value", snapshot => {
              role = snapshot.val().role || "user"
              if(role !== "admin")  return;
              props.firebase.db.ref(`${pt}/${pid}`)
                .set({
                  id: pid,
                  name: pname,
                  description: pdesc
                })
                .then(() => console.log("Added"))
            })
          }}>Add paper</Button>
        </form>
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

export default withAuthentication(withFirebase(AddPaper))