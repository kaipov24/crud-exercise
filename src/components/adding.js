import React, { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import schema from "../common/validation-scheme"
import Header from "./header"
import { addEmployee } from "../redux/reducers/employees"
import countries from "../common/countries"

const Adding = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("Portugal")
  const [salary, setSalary] = useState("")
  const [errs, setErrs] = useState({})

  const validateAndAdd = useCallback(() => {
    const dataObj = { name, birthdate, position, country, salary }
    const { error } = schema.validate(dataObj, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    })
    if (!error?.details?.length) {
      dispatch(addEmployee(dataObj))
    } else {
      debugger
      setErrs(
        error.details.reduce((acc, rec) => {
          return { ...acc, [rec.path]: rec }
        }, {})
      )
    }
  }, [name, birthdate, position, country, salary, dispatch])

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
              data-testid="name"
              className="form__inputs__field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
            />
            {!!errs["name"]?.message ? (
              <div className="form__inputs__text form__inputs__text__red">
                {errs["name"].message}
              </div>
            ) : (
              <div className="form__inputs__text">First and last names</div>
            )}
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="birthdate">
              Birthdate
            </label>
            <input
              id="birthdate"
              data-testid="birthdate"
              className="form__inputs__field"
              type="text"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="e.g. 17/02/1990"
            />
            {!!errs["birthdate"]?.message ? (
              <div className="form__inputs__text form__inputs__text__red">
                {errs["birthdate"].message}
              </div>
            ) : (
              <div className="form__inputs__text">DD/MM/YYYY</div>
            )}
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="position">
              Job titile
            </label>
            <input
              id="position"
              className="form__inputs__field"
              type="text"
              data-testid="role"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Product Manager"
            />
            {!!errs["position"]?.message ? (
              <div className="form__inputs__text form__inputs__text__red">
                {errs["position"].message}
              </div>
            ) : (
              <div className="form__inputs__text">What is their role?</div>
            )}
          </div>

          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              data-testid="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="country__pick"
            >
              {countries.map((it) => {
                return <option key={it.value} value={it.text}>{it.text}</option>
              })}
            </select>
            {!!errs["country"]?.message ? (
              <div className="form__inputs__text form__inputs__text__red">
                {errs["country"].message}
              </div>
            ) : (
              <div className="form__inputs__text">Where are they based?</div>
            )}
          </div>
          <div className="form__inputs__inner">
            <label className="form__inputs__label" htmlFor="salary">
              Salary
            </label>
            <input
              id="salary"
              className="form__inputs__field"
              type="text"
              data-testid="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 50000"
            />
            {!!errs["salary"]?.message ? (
              <div className="form__inputs__text form__inputs__text__red">
                {errs["salary"].message}
              </div>
            ) : (
              <div className="form__inputs__text ">Gross yearly salary</div>
            )}
          </div>
        </div>
        <div className="form__buttons">
          <div>
            <Link
              style={{ fontWeight: "400" }}
              className="purple__button"
              type="submit"
              to="/"
              data-testid="cancel-button"
            >
              Cancel
            </Link>

            <button
              className="purple__button"
              type="button"
              data-testid="add-button"
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

export default React.memo(Adding)
