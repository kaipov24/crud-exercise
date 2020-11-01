import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "connected-react-router"

import thunk from "redux-thunk"
import createRootReducer from "./reducers"
import history from '../history'

const middleware = [routerMiddleware(history), thunk]
const initialState = {}

const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose
const composedEnchanters = composeFunc(applyMiddleware(...middleware))
const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnchanters
)

export default store
