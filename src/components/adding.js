import React from "react"

const Adding = () => {
  return (
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
          <input id="name" className="form__inputs__field" type="text" />
        </div>

        <div className="form__inputs__inner">
          <label className="form__inputs__label" htmlFor="birthdate">
            Birthdate
          </label>
          <input id="birthdate" className="form__inputs__field" type="text" />
        </div>

        <div className="form__inputs__inner">
          <label className="form__inputs__label" htmlFor="position">
            Job titile
          </label>
          <input id="position" className="form__inputs__field" type="text" />
        </div>

        <div className="form__inputs__inner">
          <label className="form__inputs__label" htmlFor="country">
            Job titile
          </label>
          <select id="country" className="form__inputs__field" />
        </div>

        <div className="form__inputs__inner">
          <label className="form__inputs__label" htmlFor="salary">
            Salary
          </label>
          <input id="salary" className="form__inputs__field" type="text" />
        </div>
      </div>
    </div>
  )
}

React.memo(Adding)

export default Adding
