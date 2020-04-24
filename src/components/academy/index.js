import React, { useState } from 'react'
import { Jumbotron, Row, Col, Spinner } from 'react-bootstrap'
import { withFirebase } from '../firebase'
let gotA = false, gotE = false
const getArticles = (firebase, setArticles) => {
  firebase.db.ref('articles').once("value", snapshot => {
    gotA = true
    if(!snapshot.val()) return;
    setArticles((Object.values(snapshot.val())).sort((a,b) => b.timestamp-a.timestamp))
  })
}
const getEditorials = (firebase, setEd) => {
  firebase.db.ref('editorials').once("value", snapshot => {
    gotE = true
    if(!snapshot.val()) return;
    setEd((Object.values(snapshot.val())).sort((a,b) => b.timestamp-a.timestamp))
  })
}
const Academy = props => {
  const [articles, setArticles] = useState([])
  const [editorials, setEd] = useState([])
  return(
    <div>
      {gotA?null:getArticles(props.firebase, setArticles)}
      {gotE?null:getEditorials(props.firebase, setEd)}
      <h2 style = {{textAlign: "center"}}>NiTR Codes Academy</h2>
      <h4 style = {{textAlign: "center"}}>Learn before you apply, learn from applications</h4>
      <Jumbotron style = {{maxWidth: "900px", marginLeft: "auto", marginRight: "auto"}}>
        <Row noGutters>
          <Col sm={3} style = {{paddingRight: "5px"}}>
            <h2 style = {{fontFamily: "equinox"}}>Articles</h2>
            <h6>Let's learn concepts from a practical approach.</h6>
          </Col>
          <Col sm={9} style = {{maxHeight: "50vh", borderLeft: "1px dashed #101820FF", paddingLeft: "5px"}}>
            {articles.length === 0?(gotA?<h2 style = {{fontFamily: "equinox"}}>Coming Soon!</h2>:<Spinner animation="border" />)
            :articles.map((a, i) => (
                <div>
                  <h6><a style = {{textDecoration: "none"}} href = {`/academy/articles/${a.id}`}>#{i+1}. {a.name}</a></h6>
                  {a.description}
                </div>
              ))
            }
          </Col>
        </Row>
      </Jumbotron>
      <Jumbotron style = {{maxWidth: "900px", marginLeft: "auto", marginRight: "auto"}}>
        <Row noGutters>
          <Col sm={9} style = {{maxHeight: "50vh", borderRight: "1px dashed #101820FF", paddingRight: "5px"}}>
            {editorials.length === 0?(gotE?<h2 style = {{fontFamily: "equinox"}}>Coming Soon!</h2>:<Spinner animation="border" />)
            :editorials.map((e, i) => (
              <div>
                <h6><a style = {{textDecoration: "none"}} href = {`/academy/editorials/${e.id}`}>#{i+1}. {e.name}</a></h6>
                {e.description}
              </div>
            ))
            }
          </Col>
          <Col sm={3} style = {{paddingLeft: "5px"}}>
            <h2 style = {{fontFamily: "equinox"}}>Editorials</h2>
            <h6>Stuck at a problem? Browse through solutions and follow-ups here.</h6>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  )
}

export default withFirebase(Academy)