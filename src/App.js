import React from "react"
import { ConnectedRouter } from "connected-react-router"
import { Switch, Route } from "react-router-dom"
import history from "./history"
import Main from "./components/main.js"
import Adding from "./components/adding.js"
import Editing from "./components/editing.js"

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/add" component={Adding} />
        <Route exact path="/:id" component={Editing} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App
