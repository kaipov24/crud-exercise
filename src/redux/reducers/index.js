import { combineReducers } from "redux"
import employees from "./employees"

const createRootReducer = () =>
  combineReducers({
    employees,
  })

export default createRootReducer
