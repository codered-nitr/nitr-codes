import React, { useState } from 'react'
import { withFirebase } from '../firebase'
import { Button } from 'react-bootstrap'
import { withAuthentication, AuthUserContext } from '../session'

const AddProblemBase = props => {
  const [pid, setPID] = useState(null)
  const [pname, setPname] = useState(null)
  const [ptags, setPtags] = useState(null)
  return(
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
        <form>
          <label>Problem ID:</label><br />
          <input type="text" id="id" name="id" required value= {pid} onChange = {event => setPID(event.target.value)} /><br />
          <label>Problem name:</label><br />
          <input type="text" id="name" name="name" required value= {pname} onChange = {event => setPname(event.target.value)} /><br />
          <label>Problem tags:</label><br />
          <input type="text" id="tags" name="tags" required value= {ptags} onChange = {event => setPtags(event.target.value)} /><br />
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
                .then(() => window.alert("Added"))
            })
          }}>Add problem</Button>
        </form>
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

const AddPaperBase = props => {
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
          <input type="text" id="id" name="id" required value= {pid} onChange = {event => setPID(event.target.value)} /><br />
          <label>Paper name:</label><br />
          <input type="text" id="name" name="name" required value= {pname} onChange = {event => setPname(event.target.value)} /><br />
          <label>Paper description:</label><br />
          <input type="text" id="description" name="desc" required value= {pdesc} onChange = {event => setPdesc(event.target.value)} /><br />
          <label>Paper type:</label><br />
          <input type="text" id="type" name="tags" value= {pt} required placeholder = "articles/editorials" onChange = {event => setPt(event.target.value)} /><br />
          <Button variant = "dark" onClick = {() => {
            let role = "user"
            props.firebase.user(authUser.uid).on("value", snapshot => {
              role = snapshot.val().role || "user"
              if(role !== "admin")  return;
              if(pt !== "articles" && pt !== "editorials"){
                window.alert("Invalid paper type")
                return
              }
              props.firebase.db.ref(`${pt}/${pid}`)
                .set({
                  id: pid,
                  name: pname,
                  description: pdesc,
                  timestamp: Date.now()
                })
                .then(() => window.alert("Added"))
            })
          }}>Add paper</Button>
        </form>
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

const AddWeekBase = props => {
  const [p, setP] = useState("")
  const [a, setA] = useState("")
  const [e, setE] = useState("")
  const [w, setW] = useState("")
  return(
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
        <form>
          <label>Week Count:</label><br />
          <input type="text" id="w" name="w" required value= {w} onChange = {event => setW(event.target.value)} /><br />
          <label>Problem Names:</label><br />
          <input type="text" id="p" required name="p" value= {p} onChange = {event => setP(event.target.value)} /><br />
          <label>Article Names:</label><br />
          <input type="text" id="a" required name="a" value= {a} onChange = {event => setA(event.target.value)} /><br />
          <label>Editorial Names:</label><br />
          <input type="text" id="e" required name="e" value= {e} onChange = {event => setE(event.target.value)} /><br />
          <Button variant = "dark" onClick = {() => {
            let role = "user"
            props.firebase.user(authUser.uid).on("value", snapshot => {
              role = snapshot.val().role || "user"
              if(role !== "admin")  return;
              props.firebase.db.ref(`weeks/${w}`)
                .set({
                  id: w,
                  problems: p.split(",") || [],
                  articles: a.split(",") || [],
                  editorials: e.split(",") || [],
                })
                .then(() => window.alert("Added"))
            })
          }}>Add week</Button>
        </form>
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

const AddPaper = withAuthentication(withFirebase(AddPaperBase))
const AddProblem = withAuthentication(withFirebase(AddProblemBase))
const AddWeek = withAuthentication(withFirebase(AddWeekBase))

const CMS = () => (
  <div>
    <AddProblem />
    <AddPaper />
    <AddWeek />
  </div>
)

export default CMS