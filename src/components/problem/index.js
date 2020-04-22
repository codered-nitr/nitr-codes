import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withDBX} from '../dropbox'
import { withFirebase } from '../firebase'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import '../../css/problem.css'
import IDE from './ide'
import { withAuthentication, AuthUserContext } from '../session'
const Problem = props => {
  const {id} = useParams()  
  const [probelmDiv, setPD] = useState(null)
  const [vmsent, setVM] = useState(false)
  const history = useHistory()
  const path = `/problems/${id}.html`
  props.dbx.filesDownload({  
    path,
  }).then(response => {
    response.fileBlob.text().then(data => setPD(data))
  })
  .catch(() => history.push("/404"))
  return(
    <AuthUserContext.Consumer>
      {authUser =>
      <div className = "problem">
        <Row noGutters>
          <Col id = "pbm">
            <div className = "problemDiv">
              {probelmDiv?ReactHtmlParser(probelmDiv):"Loading"}
            </div>
          </Col>
          <Col>
          {
            (authUser && authUser.emailVerified)?
            <div className = "ideDiv"><IDE pid = {id} dbx = {props.dbx} firebase = {props.firebase}/></div>
          : <div className = "ideDiv" style = {{textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", verticalAlign: "middle", backgroundColor: "#101820FF"}}>
              <div>
                <div style = {{color: "white"}} >Please login and verify your e-mail address to access.</div><br />
                {
                  authUser?
                  vmsent?<div>
                    <Button variant = "outline-info" disabled>Verification mail sent</Button>
                  </div>
               :<div><Button variant = "outline-light" onClick = {() => {
                  props.firebase.doSendEmailVerification()
                    .then(() => setVM(true))
                }}>Send Verification Mail</Button></div>
                :null
                }
              </div>
            </div>
          }
          </Col>
        </Row>
      </div>
      }
    </AuthUserContext.Consumer>
  )
}

export default withAuthentication(withFirebase(withDBX(Problem)))