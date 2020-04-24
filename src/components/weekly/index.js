import React, { useState } from 'react'
import {withFirebase} from '../firebase'

let got = false
const getWeeks = (firebase, setW) => {
  firebase.db.ref('weeks').once("value", snapshot => {
    got = true
    if(!snapshot.val()) return
    setW((Object.values(snapshot.val())).sort((a, b) => a.id - b.id) || [])
  })
}

const Weekly = props => {
  const [weeks, setW] = useState([])
  if(!got)  getWeeks(props.firebase, setW)
  return(
    <div style = {{marginLeft: "auto", marginRight: "auto", maxWidth: "900px", paddingLeft: "10px"}}>
      <h1 style = {{fontFamily: "madeEvolve"}}>Overview</h1>
      <span><i>NiTR Codes Weekly</i> is the section where you shall find weekly release of articles, problems and editorials for a guided beginning of the course. Every week, new content will be uploaded and can be found categorized here.</span>
      <hr />
      {weeks.length === 0?(got?<h3>No info available</h3>:<h3>Loading...</h3>)
      :<div>
        {weeks.map(w => (
          <div>
            <h3>Week {w.id}</h3>
            <div style = {{paddingLeft: "20px"}}>
              <h5>Articles</h5>
              {w.articles.map(a => <a style = {{textDecoration: "none"}} href = {`/academy/articles/${a}`}>{a}</a>)}
              <h5>Problems</h5>
              {w.problems.map(a => <a style = {{textDecoration: "none"}} href = {`/problem/${a}`}>{a}</a>)}
              <h5>Editorials</h5>
              {w.editorials.map(a => <a style = {{textDecoration: "none"}} href = {`/academy/editorials/${a}`}>{a}</a>)}
            </div>
          </div>
        ))}</div>
      }
    </div>
  )
}

export default withFirebase(Weekly)