import axios from "axios"

const GET_EMPLOYEES = "GET_EMPLOYEES"
const ADD_EMPLOYEE = "ADD_EMPLOYEE"

const initialState = {
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
    default:
      return state
  }
}

export function getEmployees() {
  return function (dispatch) {
    axios(`/api/v1/employees`).then(({ data }) => {
      dispatch({ type: GET_EMPLOYEES, employees: data })
    })
  }
}

export function addEmployee(name, birthdate, position, country, salary) {
  return (dispatch) => {
    axios({
      method: "post",
      url: `/api/v1/employees`,
      data: {
        name,
        birthdate,
        position,
        country,
        salary,
      },
    }).then((data) => {
      dispatch({
        type: ADD_EMPLOYEE,
        name: data.name,
        birthdate: data.birthdate,
        position: data.position,
        country: data.country,
        salary: data.salary
      })
    })
  }
}