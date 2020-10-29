import React, { useState } from "react"
import { CountryDropdown } from "react-country-region-selector"
import { useSelector, useDispatch } from "react-redux"
import Schema from "validate"
import TextField from "@material-ui/core/TextField"
import Header from "./header"
import { addEmployee } from "../redux/reducers/employees"

const user = new Schema({
  name: {
    type: String,
    match: /^[A-Za-z.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>\u0400-\u04FF]*$/,
    required: true,
    length: { min: 3, max: 32 },
    message: {
      match: "Name should contain letters",
      length: "Name field must be more than 3 characters",
      required: "Name field is required",
    },
  },
  birthdate: {
    type: String,
    match: /^[\w-_./]*$/,
    required: true,
    message: {
      match: "Incorrect format",
      length: "Incorrect format",
      required: "Birthdate field is required",
    },
    length: { min: 3, max: 32 },
  },
  position: {
    type: String,
    match: /^[A-Za-z.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>\u0400-\u04FF]*$/,
    required: true,
    length: { min: 2, max: 32 },
    message: {
      match: "Incorrect format",
      length: "Incorrect format",
      required: "Job title field is required",
    },
  },
  country: {
    type: String,
    match: /^[\w-_./]*$/,
    required: true,
    length: { min: 2, max: 32 },
    message: {
      match: "Incorrect format",
      length: "Incorrect format",
      required: "Country field is required",
    },
  },
  salary: {
    type: String,
    match: /^[0-9]+$/,
    required: true,
    length: { min: 2, max: 32 },
    message: {
      match: "Incorrect format",
      length: "Incorrect format",
      required: "Salary field is required",
    },
  },
})

const Adding = () => {
  const dispatch = useDispatch()
  const employeesLength = useSelector(
    (store) => store.employees.employees.length
  )
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("")
  const [salary, setSalary] = useState("")
  const [errs, setErrs] = useState({})
  const id = employeesLength + 1

  const validateAndAdd = () => {
    const dataObj = { name, birthdate, position, country, salary }
    const errors = user.validate(dataObj)
    if (errors.length === 0) {
      dispatch(addEmployee(name, birthdate, position, country, salary, id))
    } else {
      setErrs(
        errors.reduce((acc, rec) => {
          return { ...acc, [rec.path]: rec }
        }, {})
      )
    }
  }

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
            <TextField
              id="name"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. Jane Doe"
              error={!!errs["name"]}
              helperText={errs["name"]?.message}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="form__inputs__text">First and last names</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="birthdate">
              Birthdate
            </label>
            <TextField
              id="birthdate"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. 17/02/1990"
              error={!!errs["birthdate"]}
              helperText={errs["birthdate"]?.message}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
            <div className="form__inputs__text">DD/MM/YYYY</div>
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="position">
              Job titile
            </label>
            <TextField
              id="position"
              className="form__inputs__field"
              type="text"
              placeholder="e.g. Product Manager"
              error={!!errs["position"]}
              helperText={errs["position"]?.message}
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
            <TextField
              id="salary"
              className="form__inputs__field"
              placeholder="e.g. 50000"
              type="text"
              error={!!errs["position"]}
              helperText={errs["position"]?.message}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <div className="form__inputs__text">Gross yearly salary</div>
          </div>
        </div>
        <div className="form__buttons">
          <div>
            <button className="purple__button" type="submit">
              Cancel
            </button>

            <button
              className="purple__button"
              type="button"
              onClick={validateAndAdd}
            >
              Add employee
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

React.memo(Adding)

export default Adding
