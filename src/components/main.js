import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import List from "./list"
import Header from "./header"
import { getEmployees } from "../redux/reducers/employees"

const Main = () => {
  const dispatch = useDispatch()
  const employees = useSelector((store) => store.employees.employees)

  useEffect(() => {
    dispatch(getEmployees())
  }, [employees])

  return (
    <div>
      <Header />
      <div className="main">
        <List />
      </div>
    </div>
  )
}

React.memo(Main)

export default Main
