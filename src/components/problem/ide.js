import React, { Component } from 'react'
import '../../css/ide.css'
import Select from 'react-select'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-terminal'
import {IconContext} from 'react-icons'
import {GiCrossMark} from 'react-icons/gi'
import {TiTickOutline} from 'react-icons/ti'
import { Button, Spinner, Modal, Table, Alert } from 'react-bootstrap'
import { AuthUserContext } from '../session'

const jsdiff = require('diff');
const request = require('request')
var au = null
const alerts = [
  <Alert variant = "danger">
    <IconContext.Provider value = {{size: "1.5em"}}>
      <GiCrossMark /> Failed
    </IconContext.Provider>
  </Alert>,
  null,
  <Alert variant = "success">
    <IconContext.Provider value = {{size: "1.5em"}}>
      <TiTickOutline /> Accepted
    </IconContext.Provider>
  </Alert>
]

class IDE extends Component{
  modes = [{value: "c_cpp", label: "C/C++", language: "cpp17", versionIndex: 0}, {value: "java", language: "java", label: "Java", versionIndex: 3}, {value: "python", label: "Python3", language: "python3", versionIndex: 3}]
  selected = 0
  constructor(props){
    super(props)
    this.state = {
      script : ``,
      theme : "monokai",
      mode : this.modes[this.selected].value,
      stdin : ``,
      stdout : ``,
      executing : false,
      showRun : false,
      AC: 0,
    }
  }

  onModeChange = selectedOption => {
    this.selected = this.modes.indexOf(selectedOption)
    this.setState({mode: selectedOption.value})
  }

  onScriptChange = newScript => this.setState({script: newScript})
  onStdInChange = event => this.setState({stdin: event.target.value})
  onClear = () => this.setState({script: ``})
  onRun = () => {
    this.setState({executing: true, stdout: `Compiling and Executing your program...`})
    request({
      url: 'https://codered-web-server.herokuapp.com/api/execute',
      method: "POST",
      json: {
        script: this.state.script,
        language: this.modes[this.selected].language,
        versionIndex: this.modes[this.selected].versionIndex,
        stdin: this.state.stdin
      }
    }, (error, response, body) => {
      if(response)
        this.setState({stdout: response.body.output || ``, executing: false})
    })
  }
  onSubmit = () => {
    this.setState({executing: true})
    this.props.dbx.filesDownload({
      path: `/testcases/${this.props.pid}.txt`
    }).then(response => {
      response.fileBlob.text().then(testdata => {
        request({
          url: 'https://codered-web-server.herokuapp.com/api/execute',
          method: "POST",
          json: {
            script: this.state.script,
            language: this.modes[this.selected].language,
            versionIndex: this.modes[this.selected].versionIndex,
            stdin: testdata
          }
        }, (error, response, body) => {
          if(response){
            this.setState({executing: false})
            this.props.dbx.filesDownload({
              path: `/outputs/${this.props.pid}.txt`
            }).then(resp => {
              resp.fileBlob.text().then(opdata => {
                const sout = (response.body.output || '').trim()
                const diff = jsdiff.diffChars(sout, opdata.trim());
                  if(diff[0]["added"] || diff[0]["removed"])  this.setState({AC: -1})
                  else  {
                    this.setState({AC: 1})
                    if(au){
                      const uref = this.props.firebase.user
                      const auid = au.uid
                      let solved = []
                      uref(auid).on("value", snapshot => {
                        solved = snapshot.val().solved || []
                        this.props.firebase.db.ref(`problems/${this.props.pid}`).once("value", snap => {
                          const by = snap.val().solved + 1
                          // console.log(by)
                          if(solved.indexOf(this.props.pid) === -1){
                            solved.push(this.props.pid)
                            uref(auid)
                              .update({
                                solved
                              })
                            uref(auid).on("value", snapshot => solved = snapshot.val().solved || [])
                            this.props.firebase.db.ref(`problems/${this.props.pid}`).update({
                              solved: by
                            })
                          }
                        })
                      })
                    }
                  }
                  setTimeout(() => this.setState({AC: 0}), 5000)
                })
              })
            }
          })
        })
      })
    }

  render() {
    return(
      <AuthUserContext.Consumer>{
        authUser =>{
          au = authUser
          return(
      <div className = "ide" id = "ide" style = {{height: "100%", width: "100%"}}>
        {alerts[this.state.AC+1]}
        <span>Language: </span>
        <span><Select
          className = "inline langSelect"
          name = "mode"
          placeholder = {this.modes[this.selected].label}
          value = {this.state.mode}
          onChange = {this.onModeChange}
          options = {this.modes}
          isSearchable = {false}
        /></span>
        <span style = {{textAlign: "right"}}>
          {this.state.executing ? <Spinner animation = "grow" size = "sm" variant = "danger"/>:
            <Button className = "actions" id = {this.state.executing?"running":"run"} type = "button" disabled = {this.state.executing} onClick = {() => this.setState({showRun: true})}>Custom Test</Button>}
          <Button className = "actions" id = "submit" type = "button" disabled = {this.state.executing} onClick = {this.onSubmit}>Submit</Button>
          <Button className = "actions" id = "clear" type = "button" onClick = {this.onClear}>Clear</Button>
        </span>
        <AceEditor
          className = "editor"
          mode = {this.state.mode}
          theme = {this.state.theme}
          fontSize = {14}
          height = '100%'
          width = '100%'
          tabSize = {2}
          setOptions = {{
            enableBasicAutocompletion : true,
            enableLiveAutocompletion : true
          }}
          value = {this.state.script}
          onChange = {this.onScriptChange}
        />
        <CustomTest show = {this.state.showRun} onHide = {() => this.setState({showRun: false})} stdin = {this.state.stdin} stdout = {this.state.stdout} onStdInChange = {this.onStdInChange} onRun = {this.onRun} executing = {this.state.executing}/>
      </div>)}}
      </AuthUserContext.Consumer>
    )
  }
}

const CustomTest = props => {
  return(
    <Modal show = {props.show} onHide = {props.onHide} aria-labelledby = "contained-modal-title-vcenter" centered>
      <Modal.Body style = {{backgroundColor: "#101820FF", color: "whitesmoke"}}>
        <Table className="center wd65" borderless>
          <thead><tr>
            <th style = {{width: "50%", color: "whitesmoke!important"}}>StdIn</th>
            <th style = {{width: "50%", color: "whitesmoke!important"}}>StdOut</th>
          </tr></thead>
        </Table>
        <div className = "IO center wd65">
          <div className = "center inline wd50">
            <textarea className = "inp noLeftBorder" placeholder = " Enter custom input" value = {props.stdin} onChange = {props.onStdInChange} />
          </div>
          <div className = "center inline wd50">
            <textarea className = "out noRightBorder" placeholder = " Run to generate output" value = {props.stdout || ""} readOnly = {true} />
          </div>
        </div>
        <div style = {{width: "100%", textAlign: "center"}}>
          <Button className = "actions" style = {{marginLeft: "auto", marginRight: "auto"}} id = {props.executing?"running":"run"} type = "button" disabled = {props.executing} onClick = {props.onRun}>Run Test</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default IDE