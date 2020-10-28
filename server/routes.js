const express = require("express")
const employeeContoller = require("./controller/employee.controller")

const router = express.Router()

router.get("/", employeeContoller.getAll)
router.post("/", employeeContoller.create)
router.patch("/:id", employeeContoller.update)

module.exports = router
