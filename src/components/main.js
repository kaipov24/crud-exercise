import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import List from "./list"
import Header from "./header"
// import Adding from "./adding"
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
        {/* <Adding /> */}
      </div>
    </div>
  )
}

React.memo(Main)

export default Main
