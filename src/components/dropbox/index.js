import React from 'react'
const Dropbox = require('dropbox')
const fetch = require("node-fetch");
const accessToken = process.env.REACT_APP_DBX_ACCESS_TOKEN

const dbx = new Dropbox.Dropbox({  
  accessToken,  
  fetch  
});

const dbxContext = React.createContext(null)
const withDBX = Component => props => (
  <dbxContext.Consumer>
    {dbx => <Component {...props} dbx = {dbx} />}
  </dbxContext.Consumer>
)
export {withDBX, dbxContext}
export default dbx