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
import { testInitialState, editEmployee } from "../../redux/reducers/employees"
import Editing from "../../components/editing"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const mockDispatch = jest.fn()

jest.mock("../../redux/reducers/employees", () => ({
  ...jest.requireActual("../../redux/reducers/employees"),
  editEmployee: jest.fn(),
}))

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 9,
  }),
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
    id: 9
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
    const mockedDispatch = jest.fn()
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
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
    expect(
      getByText(`"name" is not allowed to be empty`)
    ).toBeVisible()
  })
  it("should show error on validation Birthdate", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
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
    expect(
      getByText(`"birthdate" is not allowed to be empty`)
    ).toBeVisible()
  })
  it("should show error on validation Job Title", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
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
    expect(
      getByText(`"position" is not allowed to be empty`)
    ).toBeVisible()
  })
  it("should show error on validation Salary", () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
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
    expect(
      getByText(`"salary" is not allowed to be empty`)
    ).toBeVisible()
  })

  it("should properly select country", async () => {
    const { getByTestId, getByText, findByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )
    const countrySelect = getByTestId("country-select")

    await selectOption(countrySelect, "Poland")
    const option = getByText("Poland")
    expect(option.selected).toBe(true)
  })

  it("should call dispatch on edit button", async () => {
    const mockedDispatch = jest.fn()
    let mockFn
    editEmployee.mockImplementation((args) => Promise.resolve(args))
    mockedDispatch(() => {
      mockFn = jest.fn((arg) =>
        Promise.resolve([{ id: 1, username: "foo", arg }])
      )

      return mockFn
    })

    const { getByTestId, getByText, findByText } = render(
      <MemoryRouter>
        <Provider store={mockStore(testInitialState)}>
          <Editing />
        </Provider>
      </MemoryRouter>
    )

    fireEvent.change(getByTestId("country-select"), {
      target: { value: USER_TO_UPDATE.country },
    })

    fireEvent.change(getByTestId("salary"), {
      target: { value: USER_TO_UPDATE.salary },
    })
    fireEvent.change(getByTestId("role"), {
      target: { value: USER_TO_UPDATE.position },
    })
    fireEvent.change(getByTestId("birthdate"), {
      target: { value: USER_TO_UPDATE.birthdate },
    })
    fireEvent.change(getByTestId("name"), {
      target: { value: USER_TO_UPDATE.name },
    })

    fireEvent.click(getByTestId("edit-button"))

    expect(editEmployee).toHaveBeenCalledWith(USER_TO_UPDATE)
  })
})
