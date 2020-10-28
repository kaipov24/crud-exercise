import React, { useState } from "react"
import { CountryDropdown } from "react-country-region-selector"
import { useSelector, useDispatch } from "react-redux"
import Header from "./header"
import { addEmployee } from "../redux/reducers/employees"

const Adding = () => {
  const dispatch = useDispatch()
  const employeesLength = useSelector((store) => store.employees.employees.length)
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("")
  const [salary, setSalary] = useState("")
  const id = employeesLength + 1
  return (
    <div>
      <Header />
      <div className="form">
        <div className="form__header">
          <div className="form__header__title">Add a new employee</div>
          <div className="form__header__subtitle">
            Fill out the information of your new employee
          </div>
        </div>
        <div className="form__inputs">
          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="form__inputs__text">First and last names</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="birthdate">
              Birthdate
            </label>
            <input
              id="birthdate"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. 17/02/1990"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <div className="form__inputs__text">DD/MM/YYYY</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="position">
              Job titile
            </label>
            <input
              id="position"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. Product Manager"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <div className="form__inputs__text">What is their role?</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="country">
              Country
            </label>
            <CountryDropdown
              value={country}
              onChange={(country) => setCountry(country)}
              className="country__pick"
            />
            <div className="form__inputs__text">Where are they based?</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="salary">
              Salary
            </label>
            <input
              id="salary"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. 50000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <div className="form__inputs__text">Gross yearly salary</div>
          </div>
        </div>
        <div className="form__buttons">
          <button className="purple__button" type="submit">
            Cancel
          </button>
          <a href="/">
            <button
              className="purple__button"
              type="button"
              onClick={() => {
                dispatch(
                  addEmployee(name, birthdate, position, country, salary, id)
                )
              }}
            >
              Add employee
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

React.memo(Adding)

export default Adding
