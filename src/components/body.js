import React from "react"

const Employee = {
  name: "Ann Henry",
  birthdate: "04/12/1990",
  position: "Product Manager",
  country: "Portugal",
  salary: "60000",
}

const Body = () => {
  return (
    <div>
      <thead className="headers">
        <tr className="table__headers">
          <th className="table__headers__inner">Employee</th>
          <th className="table__headers__inner">Job title</th>
          <th className="table__headers__inner">Country</th>
          <th className="table__headers__inner">Salary</th>
          <th className="table__headers__inner"></th>
        </tr>
      </thead>
      <tbody className="table">
        <tr className="table__row">
          <td className="table__inner">
            <div className="table__inner__name">{Employee.name}</div>
            <div className="table__inner__date">{Employee.birthdate}</div>
          </td>

          <td className="table__inner">{Employee.position}</td>

          <td className="table__inner">{Employee.country}</td>

          <td className="table__inner">
            {Employee.salary} USD
            <span className="table__inner__salary">per year</span>
          </td>

          <td>
            <button className="table__button">Edit</button>
          </td>
        </tr>
      </tbody>
    </div>
  )
}

React.memo(Body)

export default Body
