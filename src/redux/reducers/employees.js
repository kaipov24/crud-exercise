import axios from "axios"
import history from "../../history"
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
} from "../actions/employees"

export const initialState = {
  employees: [],
}
export const testInitialState = {
  employees: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
      }
    case ADD_EMPLOYEE: {
      return { ...state, employees: [...state.employees, action.employee] }
    }
    case EDIT_EMPLOYEE: {
      return {
        ...state,
        employees: [
          ...state.employees.map((it) =>
            it.id !== action.employee.id
              ? it
              : { ...it, ...action.employee, id: +action.employee.id }
          ),
        ],
      }
    }
    default:
      return state
  }
}

export function getEmployees() {
  return (dispatch) =>
    axios.get(`/api/v1/employees`).then(({ data }) => {
      dispatch({ type: GET_EMPLOYEES, employees: data })
    })
}

export function addEmployee({
  name,
  birthdate,
  position,
  country,
  salary,
  id,
}) {
  const args = { name, birthdate, position, country, salary, id }
  return (dispatch) =>
    axios.post(`/api/v1/employees`, args).then(({ data }) => {
      dispatch({
        type: ADD_EMPLOYEE,
        employee: data.employee,
      })
      history.push("/")
    })
}

export function editEmployee({
  name,
  birthdate,
  position,
  country,
  salary,
  id,
}) {
  const args = { name, birthdate, position, country, salary: salary, id }

  return (dispatch) =>
    axios.patch(`/api/v1/employees/${id}`, args).then(({ data }) => {
      dispatch({
        type: EDIT_EMPLOYEE,
        employee: data.employee,
      })
      history.push("/")
    })
}
