import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const List = () => {
  const employees = useSelector((store) => store.employees.employees)

  return (
    <div>
      {" "}
      <div className="info">
        <div className="info__left">
          <div className="info__left__text">People</div>
          <div className="info__left__amount">{employees.length} employees</div>
        </div>
        <div className="info__button">
          <div></div>
          <Link to="/add">
            <button className="purple__button">Add employee</button>
          </Link>
        </div>
      </div>
      <thead className="headers">
        <tr className="table__headers">
          <th className="table__headers__inner">Employee</th>
          <th className="table__headers__inner">Job title</th>
          <th className="table__headers__inner">Country</th>
          <th className="table__headers__inner">Salary</th>
          <th className="table__headers__inner"></th>
        </tr>
      </thead>
      {employees.map((it) => {
        return (
          <div key={it.id}>
            <tbody className="table">
              <tr className="table__row">
                <td className="table__inner">
                  <div className="table__inner__name">{it.name}</div>
                  <div className="table__inner__date">{it.birthdate}</div>
                </td>

                <td className="table__inner">{it.position}</td>

                <td className="table__inner">{it.country}</td>

                <td className="table__inner">
                  {it.salary} USD
                  <span className="table__inner__salary">per year</span>
                </td>

                <td className="table__inner">
                  <Link to={`/${it.id}`}>
                    <button className="table__button">Edit</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </div>
        )
      })}
    </div>
  )
}

React.memo(List)

export default List
