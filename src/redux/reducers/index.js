import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import employees from "./employees"

const createRootReducer = (history) =>
  combineReducers({
     router: connectRouter(history),
    employees,
  })

export default createRootReducer
