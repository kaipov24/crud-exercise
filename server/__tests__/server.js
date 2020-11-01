let request = require("supertest")

describe("loading express", function () {
  let server // http server object

  beforeEach(function () {
    delete require.cache[require.resolve("../server")]
    server = require("../server")
  })

  afterEach(function () {
    server.close()
  })

  it("responds to /", function testSlash(done) {
    request(server).get("/").expect(200, done)
  })

  it("responds to /api/v1/employees", function testSlash(done) {
    request(server).get("/api/v1/employees").expect(200, done)
  })

  it("404 everything else", function testPath(done) {
    request(server).get("/api").expect(404, done)
  })
})
