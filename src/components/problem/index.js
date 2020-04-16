import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withDBX} from '../dropbox'
import { withFirebase } from '../firebase'
import { useParams, useHistory } from 'react-router-dom'
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
    <div>
      {probelmDiv?ReactHtmlParser(probelmDiv):"Loading"}
    </div>
  )
}

export default withFirebase(withDBX(Problem))