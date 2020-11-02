import React, { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import schema from "../common/validation-scheme"
import Header from "./header"
import { getEmployees, editEmployee } from "../redux/reducers/employees"
import countries from "../common/countries"

const Editing = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  const employee = useSelector((store) =>
    store.employees.employees.find((it) => +it.id === +id)
  )

  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [position, setPosition] = useState("")
  const [country, setCountry] = useState("")
  const [salary, setSalary] = useState("")
  const [errs, setErrs] = useState({})

  useEffect(() => {
    if (typeof employee !== "undefined") {
      setName(employee?.name)
      setBirthdate(employee?.birthdate)
      setPosition(employee?.position)
      setCountry(employee?.country)
      setSalary(employee?.salary)
    }
  }, [employee])

  const clickSave = useCallback(() => {
    const dataObj = { name, birthdate, position, country, salary, id: +id }
    const { error } = schema.validate(dataObj, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    })
    if (!error?.details?.length) {
      dispatch(editEmployee(dataObj))
    } else {
      setErrs(
        error.details.reduce((acc, rec) => {
          return { ...acc, [rec.path]: rec }
        }, {})
      )
    }
  }, [name, birthdate, position, country, salary, id, dispatch])

  return (
    <div>
      <Header />
      <div className="form">
        <div className="form__header">
          <div className="form__header__title">Edit employee</div>
          <div className="form__header__subtitle">
            Edit the information of your employee
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
              className="form__inputs__field form__inputs__field__edit"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="form__inputs__field form__inputs__field__edit"
              type="text"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
              className="form__inputs__field form__inputs__field__edit"
              type="text"
              data-testid="role"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
              onChange={(e) => setCountry(e.target.value)}
              className="country__pick country__pick__edit"
              value={country}
            >
              {countries.map((it) => {
                return <option key={it.value}>{it.text}</option>
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
              className="form__inputs__field form__inputs__field__edit"
              type="text"
              data-testid="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
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
          <Link
            style={{ fontWeight: "400" }}
            className="purple__button"
            to="/"
            data-testid="cancel-button"
          >
            Cancel
          </Link>
          <button
            data-testid="edit-button"
            className="purple__button"
            type="button"
            onClick={clickSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Editing)
