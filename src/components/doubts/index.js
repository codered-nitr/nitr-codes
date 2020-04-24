import React, {useState} from 'react'
import { withFirebase } from '../firebase'
import { withAuthentication, AuthUserContext } from '../session'
import { Button, Tab, Row, Col, Nav, Form, FormControl } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaAngleRight } from 'react-icons/fa'
let got = false
const getDoubts = (props, setList) => {
  got = true
  props.firebase.db.ref('doubts').once("value", snapshot => {
    if(!snapshot.val()) return;
    setList((Object.values(snapshot.val())).sort((a,b) => b.timestamp-a.timestamp))
  })
}

const Doubts = props => {
  const [vmsent, setVM] = useState(false)
  const [heading, setHead] = useState("")
  const [dbt, setDbt] = useState("")
  const [list, setList] = useState([])
  const [comment, setComment] = useState("")
  return(
    <AuthUserContext.Consumer>
      {authUser => {
        return(authUser && authUser.emailVerified?
        <div style = {{width: "100%"}}>
          {!got?getDoubts(props, setList):null}
          <IconContext.Provider value = {{size: "1.25em"}}>
          <h2 style = {{textAlign: "center"}}>Peer-to-peer forum</h2>
          <div style = {{textAlign: "center", maxWidth: "900px", marginLeft: "auto", marginRight: "auto"}}>If you have any doubts, feel free to post it here and wait for one of us or your peers to reply. If you would like to suggest/have a query regarding anything on the website, please send a mail to <a href="mailto:codered.nitrkl@gmail.com">codered.nitrkl@gmail.com</a> instead.</div>
          <div style = {{maxWidth: "1000px", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
          <Tab.Container id = "doubts" defaultActiveKey = "zero">
            <Row noGutters>
              <Col sm = {3} style = {{fontFamily: "equinox", maxHeight: "90vh", overflow: "auto"}}>
                <Nav variant = "pills" className = "flex-column">
                  <Nav.Item><Nav.Link eventKey = "zero">
                    <AiOutlinePlusCircle />&nbsp;
                    Ask a Doubt
                  </Nav.Link></Nav.Item>
                  {list.map((d, i) => (
                    <Nav.Item><Nav.Link eventKey = {i}>
                      <FaAngleRight />{d.head}
                    </Nav.Link></Nav.Item>
                  ))}
                </Nav>
              </Col> 
              <Col sm = {9}>
                <Tab.Content>
                  <Tab.Pane eventKey = "zero">
                    <Form onSubmit = {event => {
                      const now = Date.now()
                      props.firebase.db.ref(`doubts/${now}`).set({
                        author: authUser.displayName,
                        head: heading,
                        doubt: dbt,
                        timestamp: now,
                        comments: []
                      }).then(() => window.alert("Doubt successfully queued!"))
                      setHead("")
                      setDbt("")
                      event.preventDefault()
                    }}>
                      Subject: <FormControl type = "text" required value = {heading} onChange = {event => setHead(event.target.value)} placeholder = "Doubt heading/subject" /><br />
                      Ask your doubt: <FormControl as = "textarea" required value = {dbt} onChange = {event => setDbt(event.target.value)} placeholder = "Explain your doubt" /><br />
                      <div style = {{textAlign: "center"}}><Button type = "submit" variant = "outline-dark">Submit</Button></div>
                    </Form>
                  </Tab.Pane>
                  {list.map((d, i) => (
                    <Tab.Pane eventKey = {i}>
                      <h3 style = {{fontFamily: "madeEvolve"}}>{d.head}</h3>
                      <small>asked by {d.author}</small>
                      <hr />
                      {d.doubt}
                      <hr />
                      <h4 style = {{fontFamily: "madeEvolve"}}>Comments</h4>
                      <Form onSubmit = {event => {
                        d.comments = d.comments || []
                        d.comments.push({
                          author: authUser.displayName,
                          email: authUser.email,
                          timestamp: Date.now(),
                          data: comment
                        })
                        props.firebase.db.ref(`doubts/${d.timestamp}`).update({comments: d.comments})
                        setComment("")
                        event.preventDefault()
                      }}>
                        <FormControl as = "textarea" required value = {comment} onChange = {event => setComment(event.target.value)} placeholder = "Add a comment" />
                        <Button type = "sumbit" variant = "outline-dark">Send</Button>
                      </Form>
                      {d.comments?d.comments.sort((a, b) => b.timestamp - a.timestamp).map((c, i) => (
                        <div style = {{borderBottom: "1px dashed"}}>
                          <span><i><a href = {`mailto:${c.email}`} style = {{textDecoration: "none"}}>{c.author}</a> says: </i></span>
                          <span>{c.data}</span>
                        </div>
                        ))
                       :<div>No comments yet</div>
                      }
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          </div>
          </IconContext.Provider>
        </div>
       :<div style = {{textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#101820FF", height: "100%", width: "100%"}}>
          <div>
          <div style = {{color: "white"}} >Please login and verify your e-mail address to access.</div><br />
          {
            authUser?
            (vmsent?<div>
              <Button variant = "outline-info" disabled>Verification mail sent</Button>
            </div>
          :<div><Button variant = "outline-light" onClick = {() => {
            props.firebase.doSendEmailVerification()
              .then(() => setVM(true))
          }}>Send Verification Mail</Button></div>)
          :null
          }
          </div>
        </div>
        )
      }}
    </AuthUserContext.Consumer>
  )
}

export default withAuthentication(withFirebase(Doubts))