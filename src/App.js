import React from "react"

import { BrowserRouter as Router , Switch, Route } from "react-router-dom"
import Main from "./components/main.js"
import Adding from "./components/adding.js"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/add" component={() => <Adding />} />
      </Switch>
    </Router>
  )
}

export default App