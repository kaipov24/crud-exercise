import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  cleanup,
  getByText,
  findByText,
  fireEvent,
  render,
} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import configureStore from "redux-mock-store"
import { initialState, editEmployee } from "../../redux/reducers/employees"
import Editing from "../../components/editing"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock("../../redux/reducers/employees", () => ({
  ...jest.requireActual("../../redux/reducers/employees"),
  editEmployee: jest.fn(),
}))

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const keyDownEvent = {
  key: "ArrowDown",
}

const USER_TO_UPDATE = {
  country: "Poland",
  salary: "77777",
  position: "Traitor",
  birthdate: "01/01/1852",
  name: "Ramsey Bolton",
}

export async function selectOption(container, optionText) {
  fireEvent.keyDown(container, keyDownEvent)
  await findByText(container, optionText)
  fireEvent.change(container, {
    target: { value: optionText },
  })
  fireEvent.click(getByText(container, optionText))
}

describe("Editing page", () => {
  it("should show error on validation name", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )
    const editButton = getByTestId("edit-button")
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(getByText(`"name" is not allowed to be empty`)).toBeVisible()
  })
  it("should show error on validation Birthdate", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )
    const editButton = getByTestId("edit-button")
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(getByText(`"birthdate" is not allowed to be empty`)).toBeVisible()
  })
  it("should show error on validation Job Title", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )
    const editButton = getByTestId("edit-button")
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(getByText(`"position" is not allowed to be empty`)).toBeVisible()
  })
  it("should show error on validation Salary", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )
    const editButton = getByTestId("edit-button")
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(getByText(`"birthdate" is not allowed to be empty`)).toBeVisible()
  })

  it("should properly select country", async () => {
    const { getByTestId, getByText, findByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Adding />
        </Provider>
      </MemoryRouter>
    )
    const countrySelect = getByTestId("country-select")

    await selectOption(countrySelect, "Monaco")
    const option = getByText("Monaco")
    expect(option.selected).toBe(true)
  })

  it("should call dispatch on add button", async () => {
    let mockFn
    addEmployee.mockImplementation((args) => Promise.resolve(args))
    useDispatch.mockImplementation(() => {
      mockFn = jest.fn((arg) =>
        Promise.resolve([{ id: 1, username: "foo", arg }])
      )

      return mockFn
    })

    const { getByTestId, getByText, findByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(initialState)}>
          <Adding />
        </Provider>
      </MemoryRouter>
    )

    fireEvent.change(getByTestId("country-select"), {
      target: { value: USER_TO_CREATE.country },
    })

    fireEvent.change(getByTestId("salary"), {
      target: { value: USER_TO_CREATE.salary },
    })
    fireEvent.change(getByTestId("role"), {
      target: { value: USER_TO_CREATE.position },
    })
    fireEvent.change(getByTestId("birthdate"), {
      target: { value: USER_TO_CREATE.birthdate },
    })
    fireEvent.change(getByTestId("name"), {
      target: { value: USER_TO_CREATE.name },
    })

    fireEvent.click(getByTestId("add-button"))

    expect(addEmployee).toHaveBeenCalledWith(USER_TO_CREATE)
  })
})
