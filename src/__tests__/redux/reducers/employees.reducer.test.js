import configureStore from "redux-mock-store"
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
} from "../../../redux/actions/employees"
import reducer, { initialState } from "../../../redux/reducers/employees"

const middlewares = []
const mockStore = configureStore(middlewares)

const getEmployees = () => ({ type: GET_EMPLOYEES, employees: [] })

const initialTestUser = {
  name: "test-name",
  birthdate: "01/01/1980",
  position: "test-position",
  country: "test-country",
  salary: "test-salary",
  id: 1
}

describe("employee reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it("should handle GET_EMPLOYEES with no load", () => {
    expect(reducer(undefined, { type: GET_EMPLOYEES, employees: [] })).toEqual({
      ...initialState,
      employees: [],
    })
  })

  it("should handle ADD_EMPLOYEE with load", () => {
    expect(
      reducer(undefined, { type: GET_EMPLOYEES, employees: [{ user: 1 }] })
    ).toEqual({ ...initialState, employees: [{ user: 1 }] })

    expect(
      reducer(
        { ...initialState, employees: [{ user: 1 }] },
        { type: GET_EMPLOYEES, employees: [{ user: 2 }] }
      )
    ).toEqual({ ...initialState, employees: [{ user: 2 }] })
  })

  it("should handle ADD_EMPLOYEE", () => {
    expect(
      reducer(undefined, { type: ADD_EMPLOYEE, employee: { user: 1 } })
    ).toEqual({ ...initialState, employees: [{ user: 1 }] })

    expect(
      reducer(
        { ...initialState, employees: [{ user: 1 }] },
        { type: ADD_EMPLOYEE, employee: { user: 2 } }
      )
    ).toEqual({ ...initialState, employees: [{ user: 1 }, { user: 2 }] })
  })

  it("should handle EDIT_EMPLOYEE with empty store", () => {
    expect(
      reducer(undefined, { type: EDIT_EMPLOYEE, employee: initialTestUser })
    ).toEqual({ ...initialState, employees: [] })
  })

  it("should handle EDIT_EMPLOYEE with different Id", () => {
    const newUser = {
      ...Object.keys(initialTestUser).reduce((acc, key) => {
        return { ...acc, [key]: key === "id" ? 0 : `${key}-${+new Date()}` }
      }, {}),
    }
    expect(
      reducer(
        reducer(undefined, { type: ADD_EMPLOYEE, employee: initialTestUser }),
        { type: EDIT_EMPLOYEE, employee: newUser }
      )
    ).toEqual({ ...initialState, employees: [initialTestUser] })
  })

   it("should handle EDIT_EMPLOYEE with same Id", () => {
     const employee = {
       ...Object.keys(initialTestUser).reduce((acc, key) => {
         return {
           ...acc,
           [key]: key === "id" ? +initialTestUser.id : `${key}-${+new Date()}`,
         }
       }, {}),
     }

     expect(
       reducer(
         { employees: [initialTestUser] },
         { type: EDIT_EMPLOYEE, employee }
       )
     ).toEqual({ ...initialState, employees: [employee] })
   })
})

it("should dispatch action", () => {
  // Initialize mockstore with empty state
  const initialState = {}
  const store = mockStore(initialState)

  // Dispatch the action
  store.dispatch(getEmployees())

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: GET_EMPLOYEES, employees: [] }
  expect(actions).toEqual([expectedPayload])
})
