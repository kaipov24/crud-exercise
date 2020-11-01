import React, { useEffect } from "react"
import {  useDispatch } from "react-redux"
import List from "./list"
import Header from "./header"
import { getEmployees } from "../redux/reducers/employees"

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  return (
    <div>
      <Header />
      <div className="main">
        <List />
      </div>
    </div>
  )
}


export default React.memo(Main)

