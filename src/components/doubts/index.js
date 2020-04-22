import React, {useState} from 'react'
import { withFirebase } from '../firebase'
import { withAuthentication, AuthUserContext } from '../session'
import { Button, Tab, Row, Col, Nav, Form, FormControl } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaAngleRight } from 'react-icons/fa'
import { DiscussionEmbed } from 'disqus-react'
let got = false
const getDoubts = (props, setList) => {
  props.firebase.db.ref('doubts').once("value", snapshot => {
    setList((Object.values(snapshot.val())).sort((a,b) => b.timestamp-a.timestamp))
    got = true
  })
}
const Doubts = props => {
  const [vmsent, setVM] = useState(false)
  const [heading, setHead] = useState("")
  const [dbt, setDbt] = useState("")
  const [list, setList] = useState([])
  return(
    <AuthUserContext.Consumer>
      {authUser => {
        console.log(list)
        return(authUser && authUser.emailVerified?
        <div style = {{width: "100%"}}>
          {!got?getDoubts(props, setList):null}
          <IconContext.Provider value = {{size: "1.25em"}}>
          <h2 style = {{textAlign: "center"}}>Peer-to-peer forum</h2>
          <div style = {{maxWidth: "900px", marginLeft: "auto", marginRight: "auto"}}>
          <Tab.Container id = "doubts" defaultActiveKey = "zero">
            <Row>
              <Col sm = {3} style = {{fontFamily: "equinox"}}>
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
                      props.firebase.db.ref("doubts").push().set({
                        author: authUser.displayName,
                        head: heading,
                        doubt: dbt,
                        timestamp: Date.now()
                      }).then(() => window.alert("Doubt successfully queued!"))
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
                      <div className = "disqus">
                        <DiscussionEmbed shortname = "nitrcodes" config = {{
                          url: window.location.href,
                          identifier: d.timestamp,
                          title: d.head
                        }} />
                      </div>
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