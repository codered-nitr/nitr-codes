import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withDBX} from '../dropbox'
import { withFirebase } from '../firebase'
import { useParams, useHistory } from 'react-router-dom'
const Paper = props => {
  const {type, id} = useParams()
  const [paper, setPaper] = useState(null)
  const history = useHistory()
  const path = `/${type}/${id}.html`
  props.dbx.filesDownload({  
    path,
  }).then(response => {
    response.fileBlob.text().then(data => setPaper(data))
  })
  .catch(() => history.push("/404"))
  return(
    <div>
      {paper?ReactHtmlParser(paper):"Loading"}
    </div>
  )
}

export default withFirebase(withDBX(Paper))