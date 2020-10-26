import { combineReducers } from "redux"
import sample from "./sample"

const createRootReducer = () =>
  combineReducers({
    sample,
  })

export default createRootReducer
