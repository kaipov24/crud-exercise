import axios from 'axios';
import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
} from "../../../redux/actions/employees"

import { editEmployee, getEmployees, addEmployee } from "../../../redux/reducers/employees"
const initialTestUser = {
  name: "test-name",
  birthdate: "01/01/1980",
  position: "test-position",
  country: "test-country",
  salary: "test-salary",
  id: 1,
}

const newUser = {
  name: "test-name2",
  birthdate: "01/01/1982",
  position: "test-position2",
  country: "test-country2",
  salary: "test-salary2",
  id: 2,
}
jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe("GET_EMPLOYEES", () => {
  it("fetches successfully data from an API ", async () => {
    const requestData = [initialTestUser]

    const expectedAction = {
      employees: requestData,
      type: GET_EMPLOYEES
    }

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: requestData })
    )
    const callback = getEmployees()
    expect(typeof callback).toBe("function")

    const store = mockStore({ employees: [] })

    return store.dispatch(getEmployees()).then(() => {
      expect(store.getActions()).toEqual([expectedAction])
            expect(axios.get).toHaveBeenCalledWith(`/api/v1/employees`)

    })
  })
})

describe("ADD_EMPLOYEES", () => {
  it("post successfully data from to API and get dispatched", async () => {
    const requestData = initialTestUser

    const expectedAction = {
      employee: newUser,
      type: ADD_EMPLOYEE,
    }

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: {employee: newUser} }))

    const callback = addEmployee(initialTestUser)
    expect(typeof callback).toBe("function")

    const store = mockStore({ employees: [] })

    return store.dispatch(addEmployee(requestData)).then(() => {
      expect(store.getActions()).toEqual([expectedAction])

      expect(axios.post).toHaveBeenCalledWith(`/api/v1/employees`, requestData)
    })
  })
})


describe("EDIT_EMPLOYEE", () => {
  it("patch successfully data from to API and get dispatched", async () => {
    const requestData = initialTestUser

    const expectedAction = {
      employee: newUser,
      type: EDIT_EMPLOYEE,
    }

    axios.patch.mockImplementationOnce(() =>
      Promise.resolve({ data: { employee: newUser } })
    )

    const callback = editEmployee(initialTestUser)
    expect(typeof callback).toBe("function")

    const store = mockStore({ employees: [] })

    return store.dispatch(editEmployee(requestData)).then(() => {
      expect(store.getActions()).toEqual([expectedAction])
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/v1/employees/${requestData.id}`,
        requestData
      )

    })
  })
})