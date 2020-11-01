import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const List = () => {
  const employees = useSelector((store) => store.employees.employees)

  return (
    <div>
      <div className="info">
        <div className="info__left">
          <div className="info__left__text">People</div>
          <div className="info__left__amount" data-testid="amount-label">
            {employees.length} employees
          </div>
        </div>
        <div className="info__button">
          <Link to="/add">
            <button className="purple__button__icon">
              <div className="add__button">
                <div className="add__button__profile">
                  <div className="profile__icon__up"></div>
                  <div className="profile__icon__down"></div>
                </div>
                <div>Add employee</div>
              </div>
            </button>
          </Link>
        </div>
      </div>
      <table className="table">
        <thead className="headers">
          <tr className="table__headers">
            <th className="table__headers__inner">Employee</th>
            <th className="table__headers__inner">Job title</th>
            <th className="table__headers__inner">Country</th>
            <th className="table__headers__inner">Salary</th>
            <th className="table__headers__inner" />
          </tr>
        </thead>
        <tbody className="thead">
          {employees.map((it) => {
            return (
              <tr
                className="table__row"
                data-testid={`row-${it.id}`}
                key={it.id}
              >
                <td className="table__inner">
                  <div
                    className="table__inner__name"
                    data-testid={`name-${it.id}`}
                  >
                    {it.name}
                  </div>
                  <div
                    className="table__inner__date"
                    data-testid={`birthdate-${it.id}`}
                  >
                    {it.birthdate}
                  </div>
                </td>

                <td data-testid={`position-${it.id}`} className="table__inner">
                  {it.position}
                </td>

                <td data-testid={`country-${it.id}`} className="table__inner">
                  {it.country}
                </td>

                <td data-testid={`salary-${it.id}`} className="table__inner">
                  {it.salary} USD
                  <span className="table__inner__salary">per year</span>
                </td>

                <td className="table__inner">
                  <Link
                    data-testid={`edit-${it.id}`}
                    to={`/${it.id}`}
                    className="table__button"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default React.memo(List)
