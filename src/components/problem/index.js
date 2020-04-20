import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withDBX} from '../dropbox'
import { withFirebase } from '../firebase'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import '../../css/problem.css'
import IDE from './ide'
const Problem = props => {
  const {id} = useParams()  
  const [probelmDiv, setPD] = useState(null)
  const history = useHistory()
  const path = `/problems/${id}.html`
  props.dbx.filesDownload({  
    path,
  }).then(response => {
    response.fileBlob.text().then(data => setPD(data))
  })
  .catch(() => history.push("/404"))
  return(
    <div className = "problem">
      <Row noGutters>
        <Col id = "pbm">
          <div className = "problemDiv">
            {probelmDiv?ReactHtmlParser(probelmDiv):"Loading"}
          </div>
        </Col>
        <Col><div className = "ideDiv"><IDE pid = {id} dbx = {props.dbx} firebase = {props.firebase}/></div></Col>
      </Row>
    </div>
  )
}

export default withFirebase(withDBX(Problem))