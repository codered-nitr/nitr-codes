import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withDBX} from '../dropbox'
import { withFirebase } from '../firebase'
import { useParams, useHistory } from 'react-router-dom'
import { DiscussionEmbed } from 'disqus-react'
import '../../css/paper.css'
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
  const disqusConfig = {
    url: window.location.href,
    identifier: window.location.pathname,
    title: window.location.pathname    
  }
  return(
    <div>
      <div className = "paperArea">{paper?ReactHtmlParser(paper):"Loading"}</div>
      <div className = "disqus">
        <DiscussionEmbed shortname = "nitrcodes" config = {disqusConfig} />
      </div>
    </div>
  )
}

export default withFirebase(withDBX(Paper))