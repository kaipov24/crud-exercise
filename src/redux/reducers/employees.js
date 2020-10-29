import axios from "axios"

const GET_EMPLOYEES = "GET_EMPLOYEES"
const ADD_EMPLOYEE = "ADD_EMPLOYEE"
const EDIT_EMPLOYEE = "EDIT_EMPLOYEE"

const initialState = {
  employees: [],
}

const id = initialState.employees.length + 1


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
          ...state.employees,
          {
            name: action.name,
            birthdate: action.birthdate,
            position: action.position,
            country: action.country,
            salary: action.salary,
            id: action.id,
          },
        ],
      }
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

export function addEmployee(name, birthdate, position, country, salary, id) {
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
        id
      },
    }).then((data) => {
      dispatch({
        type: ADD_EMPLOYEE,
        name: data.name,
        birthdate: data.birthdate,
        position: data.position,
        country: data.country,
        salary: data.salary,
        id: data.id
      })
    })
  }
}

export function editEmployee(name, birthdate, position, country, salary, id) {
  return (dispatch) => {
    axios({
      method: "patch",
      url: `/api/v1/employees/${id}`,
      data: {
        name,
        birthdate,
        position,
        country,
        salary,
        id: +id,
      },
    }).then((data) => {
      dispatch({
        type: EDIT_EMPLOYEE,
        name: data.name,
        birthdate: data.birthdate,
        position: data.position,
        country: data.country,
        salary: data.salary,
        id: +data.id,
      })
    })
  }
}