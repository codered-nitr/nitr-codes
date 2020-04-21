import React, { useState } from 'react'
import { withAuthentication, AuthUserContext } from '../session'
import { withFirebase } from '../firebase'
import { Table } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import {TiTickOutline} from 'react-icons/ti'

const Problemset = props => {
  const [show, setShow] = useState([])
  let solved = []
  let pbms = []
  const getData = auth => {
    props.firebase.db.ref('problems').once("value", snapshot => {
      pbms = (Object.values(snapshot.val()))
      if(!auth){
        setShow(pbms.map((pbm, index) => {
          return(
            <tr>
              <td>{index+1}</td>
              <td>
                <span onClick = {() => window.open(`/problem/${pbm.id}`, '_blank')} style = {{textDecoration: "none", color: "#FEE715FF", cursor: "pointer"}}>{pbm.name}</span>
                {solved.indexOf(pbm.id) !== -1?
                <IconContext.Provider value = {{size: "1em"}}><TiTickOutline /></IconContext.Provider>:null}
              </td>
              <td>{pbm.tags.join(", ")}</td>
              <td>{pbm.solved}</td>
            </tr>
        )}))
        return
      }
      props.firebase.user(auth.uid).once("value", snp => solved = snp.val().solved || [])
      .then(() =>
      setShow(pbms.map((pbm, index) => {
        return(
          <tr>
            <td>{index+1}</td>
            <td>
              <span onClick = {() => window.open(`/problem/${pbm.id}`, '_blank')} style = {{textDecoration: "none", color: "#FEE715FF", cursor: "pointer"}}>{pbm.name}</span>
              {solved.indexOf(pbm.id) !== -1?
              <IconContext.Provider value = {{size: "1em"}}><TiTickOutline /></IconContext.Provider>:null}
            </td>
            <td>{pbm.tags.join(", ")}</td>
            <td>{pbm.solved}</td>
          </tr>
      )})))
    })
  }
  return(
    <AuthUserContext.Consumer>{authUser =>
      <div>
        <h2 style = {{textAlign: "center"}}>Problemset</h2>
        <Table striped borderless hover variant = "dark" style = {{maxWidth: "800px", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
          <thead>
            <th>#</th>
            <th>Problem Name</th>
            <th>Problem Tags</th>
            <th>Solved by</th>
          </thead>
          <tbody>
            {getData(authUser)}
            {show}
          </tbody>
        </Table>
      </div>}
    </AuthUserContext.Consumer>
  )
}

export default withFirebase(withAuthentication(Problemset))