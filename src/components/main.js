import React from "react"
import { useSelector } from "react-redux"
import Body from "./body"

const Main = () => {
  const user = useSelector((s) => s.sample.name)

  return (
    <div className="main">
      <Body />
      {user}
    </div>
  )
}

React.memo(Main)

export default Main
