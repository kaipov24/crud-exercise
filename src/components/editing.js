import React, { useState, useEffect } from "react"
import { CountryDropdown } from "react-country-region-selector"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Header from "./header"
import { getEmployees, editEmployee } from "../redux/reducers/employees"

const Editing = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getEmployees())
  }, [])

  const employee = useSelector(
    (store) => store.employees.employees.find((it) => +it.id === +id)
  )
  const [name, setName] = useState(`${employee?.name}`)
  const [birthdate, setBirthdate] = useState("")
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("")
  const [salary, setSalary] = useState("")

  useEffect(() => {
    setName(employee?.name)
    setBirthdate(employee?.birthdate)
    setPosition(employee?.position)
    setCountry(employee?.country)
    setSalary(employee?.salary)
  }, [employee])

  if (!employee) return "Not Found"

  return (
    <div>
      <Header />
      <div className="form">
        <div className="form__header">
          <div className="form__header__title">Edit employee</div>
          <div className="form__header__subtitle">
            Edit the information of your new employee
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
              onChange={(val) => setCountry(val)}
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
                  editEmployee(name, birthdate, position, country, salary, +id)
                )
              }}
            >
              Save
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

React.memo(Editing)

export default Editing
