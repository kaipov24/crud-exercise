const {
  getAll,
  create,
  update,
} = require("../../controller/employee.controller")
let fs = require("fs")
const { getMockReq, getMockRes } = require("@jest-mock/express")

jest.mock('fs',()=>({

  ...jest.requireActual("fs").promises,
  promises: {
    ...jest.requireActual("fs").promises,

    readFile: jest.fn(),
    writeFile: jest.fn(),
  }
}))



describe("Employee Controller", () => {
  const { res, next, clearMockRes } = getMockRes()

  beforeEach(() => {
    clearMockRes()
  })

  it("should get all users from action", async () => {
    fs.promises.readFile.mockImplementationOnce(() =>
      Promise.resolve('[{"id":1, "name": "admin"}]')
    )
    await getAll(getMockReq(), res)
    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining([{ id: 1, name: "admin" }])
    )
  })

  it("should post user", async () => {
    fs.promises.readFile.mockImplementationOnce(() =>
      Promise.resolve('[{"id":1, "name": "admin"}]')
    )
    await create(getMockReq({ body: { id: 1, name: "user" } }), res)
    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({        employee : { id: 2, name: "user" },
    })
    )
  })

  it("should patch user", async () => {
    fs.promises.readFile.mockImplementationOnce(() =>
      Promise.resolve('[{"id":1, "name": "admin"}]')
    )
    const body =  {
          name: "user",
          birthdate: "27/03/1990",
          id: 1,
          salary: 90000,
          position: "QA",
          country: "Italy"
        }
    await update(
      getMockReq({
        body,
        params: {id: 1}
      }),
      res
    )
    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ employee: body })
    )
  })

})
