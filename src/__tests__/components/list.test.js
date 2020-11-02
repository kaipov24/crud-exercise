import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import { cleanup, fireEvent, render } from "@testing-library/react"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"

import List from "../../components/list"


const EMPTY_EMPLOYEES_STATE = {employees: { employees: [] }}
const FEW_EMPLOYEES_STATE = {
  employees: {
    employees: [
      {
        name: "test-name1",
        birthdate: "01/01/1980",
        position: "test-position1",
        country: "test-country1",
        salary: "test-salary1",
        id: 1,
      },
      {
        name: "test-name2",
        birthdate: "01/01/1982",
        position: "test-position3",
        country: "test-country3",
        salary: "test-salary3",
        id: 2,
      },
      {
        name: "test-name3",
        birthdate: "01/01/1983",
        position: "test-position1",
        country: "test-country1",
        salary: "test-salary1",
        id: 3,
      },
    ],
  },
}


jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}))

describe("List", () => {
  beforeEach(() => {

  })
  afterEach(() => {
    useSelector.mockClear()
  })

  it("should render 0 amount of employyes", () => {
    useSelector.mockImplementation((callback) => {
      return callback(EMPTY_EMPLOYEES_STATE)
    })
    const { getByTestId } = render(
      <Router history={createBrowserHistory()
      }>
        <List />
      </Router>
    )
    expect(getByTestId("amount-label").textContent).toEqual("0 employees")
  })

  it(`should render ${FEW_EMPLOYEES_STATE.employees.employees} amount of employees`, () => {
    useSelector.mockImplementation((callback) => {
      return callback(FEW_EMPLOYEES_STATE)
    })
    const { getByTestId } = render(
      <Router history={createBrowserHistory()
      }>
        <List />
      </Router>
    )
    expect(getByTestId("amount-label").textContent).toEqual(
      `${FEW_EMPLOYEES_STATE.employees.employees.length} employees`
    )
  })


    it("should render all fields correctly", () => {
      useSelector.mockImplementation((callback) => {
        return callback(FEW_EMPLOYEES_STATE)
      })
      const { getByTestId } = render(
        <Router history={createBrowserHistory()
        }>
          <List />
        </Router>
      )
      FEW_EMPLOYEES_STATE.employees.employees.forEach(it => {
        expect(getByTestId(`name-${it.id}`).textContent).toEqual(it.name)
        expect(getByTestId(`birthdate-${it.id}`).textContent).toEqual(
          it.birthdate
        )
        expect(getByTestId(`position-${it.id}`).textContent).toEqual(
          it.position
        )

        expect(getByTestId(`salary-${it.id}`).textContent).toEqual(
          `${it.salary} USDper year`
        )

        expect(getByTestId(`country-${it.id}`).textContent).toEqual(
          it.country
        )
        expect(getByTestId(`edit-${it.id}`)).toBeVisible()
      })
    })

    it("should open correct edit", () => {
      useSelector.mockImplementation((callback) => {
        return callback(FEW_EMPLOYEES_STATE)
      })
      const { getByTestId } = render(
        <Router history={createBrowserHistory()
        }>
          <List />
        </Router>
      )
      FEW_EMPLOYEES_STATE.employees.employees.forEach((it) => {
        fireEvent(
          getByTestId(`edit-${it.id}`),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        )
        expect(location.pathname).toBe(`/${it.id}`)

      })
    })
})
